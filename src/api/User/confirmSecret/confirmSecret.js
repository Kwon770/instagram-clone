import { prisma } from "../../../../generated/prisma-client";
import { GenerateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret == secret) {
        return GenerateToken(user.id);
        // JWT Tokent
        return "TOKEN";
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
