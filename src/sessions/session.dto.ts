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

export class SessionDetailsDto {
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

  @ApiProperty()
  readonly fishes: Array<any>;

  @ApiProperty()
  readonly locationName: string;
}