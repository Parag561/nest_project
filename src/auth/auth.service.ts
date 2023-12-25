import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async adduser(dto: AuthDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: dto.password,
      },
    });
  }

  //get All Users
  async getuser() {
    const user = await this.prisma.user.findMany({});
    if (user.length === 0) {
      return 'data is empty';
    }

    return user;
  }

  //Get Single User
  async getsingleUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return 'User not found'; // Or throw an error indicating user not found
    }
    return user;
  }

  //delete User
  async deluser(id: number) {
    const user = await this.prisma.user.delete({
      where: { id: Number(id) },
    });
    return 'you data has been deleted';
  }

  //update User
  async updateUser(id: number, updatedData: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return 'User not found'; // Or throw an error indicating user not found
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return updatedUser;
  }
}
