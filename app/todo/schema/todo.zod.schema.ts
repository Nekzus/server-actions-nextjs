import { z } from "zod";

export const TodoZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title min 1 character" })
    .max(100, { message: "Title max 100 character" })
    .nonempty({ message: "Title is required" }),
});
