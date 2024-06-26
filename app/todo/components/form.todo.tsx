"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { createTodo } from "../actions/todo.action";
import { TodoZodSchema } from "../schema/todo.zod.schema";
import ButtonForm from "./button-form.todo";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    try {
      TodoZodSchema.parse({ title });

      const responseBackend = await createTodo(title);
      if (!responseBackend.success) {
        return toast.error(responseBackend.message);
      }
      toast.success(responseBackend.message);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.issues.map((issue) => toast.error(issue.message));
      }
    } finally {
      formRef.current?.reset();
    }
  };
  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex"
    >
      <input
        type="text"
        name="title"
        placeholder="Title todo"
        className="mr-2 w-full rounded border border-gray-400 p-2"
      />
      <ButtonForm />
    </form>
  );
};

export default FormTodo;
