import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: async (parent, _, { request }) => {
      const { user } = request;
      // parentId라고 불리는 variable 에 id를 넣는 방법
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: [user.id] }]
        });
        if (exists) return true;
        else return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
