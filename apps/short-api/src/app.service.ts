import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  createLink(data: CreateLinkDto) {
    return this.prisma.link.create({
      data: {
        url: data.link,
        hash: this.makeHash(5),
      },
    });
  }

  deleteLink(id: number) {
    return this.prisma.link.delete({
      where: {
        id,
      },
    });
  }

  getLink(hash: string) {
    return this.prisma.link.findFirst({
      where: {
        hash,
      },
    });
  }

  getAll() {
    return this.prisma.link.findMany();
  }

  makeHash(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
