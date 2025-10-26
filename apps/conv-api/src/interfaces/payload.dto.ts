import { ImageType } from 'src/converter';

export class PayloadDto {
	width: number;
	height: number;
	quality: number;
	type: ImageType;
}