import { IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  link: string;
}
