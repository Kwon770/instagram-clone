// Because all muation will use this protection, make this to reuse
export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("You need to log in to perform this action");
  }
};
