import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      // 현재 return 문이 마지막 statement 이므로, await 를 하지 않아도 서버가 자동으로
      // 이 promise가 resolve되서 결과를 전달하길 기다림
      // const user = await prisma.update({~~})
      // return user
      // 과 같음
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar }
      });
    }
  }
};
