import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly elements: Array<ElementListDto>;
}

export class ElementListDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: number;
  
  @ApiProperty()
  readonly checked: boolean;

  @ApiProperty()
  readonly category: string;
}