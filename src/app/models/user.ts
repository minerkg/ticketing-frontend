export interface User {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userRole?: User.UserRoleEnum;
  createdAt?: string;
  accountEnabled?: boolean;
}

export namespace User {
  export const UserRoleEnum = {
    Admin: 'ADMIN',
    User: 'USER',
    Supervisor: 'SUPERVISOR'
  } as const;
  export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum];
}


