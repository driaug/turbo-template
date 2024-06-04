export const Keys = {
  User: {
    id(id: string): string {
      return `account:id:${id}`;
    },
    email(email: string): string {
      return `account:${email}`;
    },
  },
};
