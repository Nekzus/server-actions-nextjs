"use client";

import { createTodo } from "../actions/todo.action";
import { useRef } from "react";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;
    await createTodo(title);
    formRef.current?.reset();
  };
  return (
    <form ref={formRef} action={handleSubmit} className="flex">
      <input
        type="text"
        name="title"
        className="border rounded border-gray-400 mr-2 p-2"
      />
      <button type="submit" className="border rounded border-gray-400 w-28 p-2">
        Add
      </button>
    </form>
  );
};

export default FormTodo;
