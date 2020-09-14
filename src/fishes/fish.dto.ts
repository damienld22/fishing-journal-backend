import { ApiProperty } from '@nestjs/swagger';

export class FishDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly weight: number;
  
  @ApiProperty()
  readonly catchDate: number;
  
  @ApiProperty()
  readonly picture: string; // Encoded in base64
}
