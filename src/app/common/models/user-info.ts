import { UserRole } from "src/app/common/enum/app-enum";

export interface User {
  userId: string;
  userFullName: string;
  animalCount: number;
  roles: UserRole[];
}
