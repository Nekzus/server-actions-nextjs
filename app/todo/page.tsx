import FormTodo from "./components/form.todo";
import ListTodo from "./components/list.todo";
import { prisma } from "@/libs/prismadb";

const TodoPage = async () => {
  const todos = await prisma.todo.findMany();

  return (
    <div className="space-y-5">
      <h1 className="text-center text-3xl my-10">Todos</h1>
      <FormTodo />
      <ListTodo todos={todos} />
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
    </div>
  );
};

export default TodoPage;
