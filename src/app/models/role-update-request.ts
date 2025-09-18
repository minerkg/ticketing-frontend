import {User} from './user';
import UserRoleEnum = User.UserRoleEnum;

export interface RoleUpdateRequest {
  username: string;
  newRole: UserRoleEnum;
}
