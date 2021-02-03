import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Document, Model } from 'mongoose';

export class FishDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly weight: number;
  
  @ApiProperty()
  readonly catchDate: number;
  
  @ApiProperty()
  readonly picture: string;

  @ApiProperty()
  readonly bait: string;

  @ApiProperty()
  readonly place: string;
}

export interface IFish extends Document {
  weight: number;
  catchDate: number;
  picture: string;
  bait: string;
  place: string;
  user: string;
}

const FishSchema: Schema = new Schema({
  weight: { type: Number},
  catchDate: { type: Number},
  picture: { type: String},
  bait: { type: String},
  place: { type: String},
  user: { type: String, required: true}
});

export const FishModel: Model<IFish> = model('Fish', FishSchema);