import { GenerateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = GenerateSecret();
      console.log(loginSecret);
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
