import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        profile: {
          create: {
            bio: createUserDto.bio,
            phone: createUserDto.phone,
          },
        },
      },
      include: { profile: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({ include: { profile: true } });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  return this.prisma.user.update({
    where: { id },
    data: {
      ...(updateUserDto.email && { email: updateUserDto.email }),
      ...(updateUserDto.name && { name: updateUserDto.name }),
      ...((updateUserDto.bio || updateUserDto.phone) && {
        profile: {
          update: {
            ...(updateUserDto.bio && { bio: updateUserDto.bio }),
            ...(updateUserDto.phone && { phone: updateUserDto.phone }),
          },
        },
      }),
    },
    include: { profile: true },
  });
}

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include: { profile: true },
    });
  }
}