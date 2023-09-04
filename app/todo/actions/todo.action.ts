"use server";

import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { TodoZodSchema } from "../schema/todo.zod.schema";

interface TodoResponse {
  success: boolean;

  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  try {
    TodoZodSchema.parse({ title });
    await prisma.todo.create({ data: { title } });
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
