// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Explicitly declare properties if needed
  email?: string;
  name?: string;
  bio?: string;
  phone?: string;
}