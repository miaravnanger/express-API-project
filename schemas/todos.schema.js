import  {z} from "zod";

export const createTodoSchema = z.object ({
    title: z.string().min(1, "Title is required"),
    dueDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const updateTodoSchema = z.object({
    done: z.boolean(),
})