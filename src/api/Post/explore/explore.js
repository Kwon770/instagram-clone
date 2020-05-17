import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    explore: (_, __, ___) => {
      return prisma.posts();
    },
  },
};
