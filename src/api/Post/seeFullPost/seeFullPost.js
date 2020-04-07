import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: (_, args) => {
      const { id } = args;
<<<<<<< HEAD
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeCount = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return {
        post,
        comments,
        likeCount
      };
    }
  }
=======
      return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    },
  },
>>>>>>> 60a9dcf9c0a8eeb24cd64d6c4eb31f11cff8ec2b
};
