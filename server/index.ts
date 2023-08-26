import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const appRouter = router({
  getPosts: publicProcedure.query(async () => {
    const posts = await prisma.post.findMany();
    return posts;
  }),
  addPost: publicProcedure
    .input(z.string().trim().nonempty().min(5))
    .mutation(async (opts) => {
      const post = await prisma.post.create({
        data: {
          content: opts.input,
          authorId: "1",
          id: `${Math.random()}`,
        },
      });
      return true;
    }),
});

export type AppRouter = typeof appRouter;
