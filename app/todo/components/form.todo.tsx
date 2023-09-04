"use client";

import toast from "react-hot-toast";
import { ZodError } from "zod";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./button-form.todo";
// import { TodoZodSchema } from "../schema/todo.zod.schema";
import { useRef } from "react";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    try {
      // TodoZodSchema.parse({ title });

      const responseBackend = await createTodo(title);
      if (!responseBackend.success) {
        return toast.error(responseBackend.message);
      }
      toast.success("Todo created");
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
        className="border rounded border-gray-400 mr-2 p-2 w-full"
      />
      <ButtonForm />
    </form>
  );
};

export default FormTodo;
