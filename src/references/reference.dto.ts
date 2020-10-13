import { ApiProperty } from '@nestjs/swagger';

export class ReferenceDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly link: string;

  @ApiProperty()
  readonly category: string;
}