import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly fishInfos: string;
  
  @ApiProperty()
  readonly location: object;
  
  @ApiProperty()
  readonly nightFishing: string;

  @ApiProperty()
  readonly otherInformations: string;
}
