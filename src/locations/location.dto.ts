import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly fishInfos: string;
  
  @ApiProperty()
  readonly location: string;
  
  @ApiProperty()
  readonly nightFishing: string;

  @ApiProperty()
  readonly otherInformations: string;
}
