import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly start: number;
  
  @ApiProperty()
  readonly end: number;
  
  @ApiProperty()
  readonly location: string;

  @ApiProperty()
  readonly otherInformations: string;
}
