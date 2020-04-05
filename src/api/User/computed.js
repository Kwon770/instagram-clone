import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    // parent: target to check // request.user : me, the user who is login with authenticated token
    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      // parentId라고 불리는 variable 에 id를 넣는 방법
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }],
        });
      } catch {
        return false;
      }
    },
    itsSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id,
            },
          },
        ],
      });
    },
  },
};
