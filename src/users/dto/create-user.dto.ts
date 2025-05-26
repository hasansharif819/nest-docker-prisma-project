export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  bio?: string;
  phone?: string;
}