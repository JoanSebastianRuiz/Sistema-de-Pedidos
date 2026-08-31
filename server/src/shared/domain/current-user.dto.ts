import { Role } from './role.enum';

export class CurrentUserDto {
  id!: number;
  email!: string;
  role!: Role;
}
