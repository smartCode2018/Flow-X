import {inngest} from "@/inngest/client";
import {createTRPCRouter, protectedProcedure} from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  getWorkfows: protectedProcedure.query(({ctx}) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "smartcode.kc@gmail.com",
      },
    });
    return {success: true, message: "Job queued"};
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
