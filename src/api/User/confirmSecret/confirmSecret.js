import { prisma } from "../../../../generated/prisma-client";
import { GenerateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret == secret) {
        // JWT Tokent
        return GenerateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
