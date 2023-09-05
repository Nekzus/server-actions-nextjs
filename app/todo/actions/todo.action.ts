"use server";

import { TodoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
interface TodoResponse {
  success: boolean;

  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return { success: false, message: "User not authenticated" };
  }
  try {
    TodoZodSchema.parse({ title });
    await prisma.todo.create({ data: { title, userId } });
    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo created",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, message: error.issues[0].message };
    }

    return { success: false, message: "Error creating todo" };
  }
};

export const removeTodo = async (id: string) => {
  if (!id || !id.trim()) {
    return { error: "Id is required" };
  }
  try {
    await prisma.todo.delete({ where: { id } });
    revalidatePath("/todo");
    return {
      success: true,
    };
  } catch (error) {
    return { error: "Error deleting todo" };
  }
};
