import z from "zod";

 const createComment = z.object({
    content:z.string(),
    status:z.enum(["APPROVED","REJECT"]),
    authorId:z.string(),
    postId:z.number(),
    parentId:z.number().optional(),
 })

const deleteSchema = z.object({
  // Validation for req.body
  body: z.object({
    authorId: z.string().min(10, "AuthorId is required to delete comment"),
  }),
  
  // Validation for req.params (Sibling to body, not inside it)
  params: z.object({
    id: z.coerce.number().int().positive("Invalid comment ID"),
  }),
});

 const updateSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string").transform(Number),
  }),
});

 export const commentSchemas = {createComment,deleteSchema,updateSchema}