import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

export class LocationDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly fishInfos: string;
  
  @ApiProperty()
  readonly location: any;
  
  @ApiProperty()
  readonly nightFishing: string;

  @ApiProperty()
  readonly otherInformations: string;
}

export interface ILocation extends Document {
  name: string;
  user: string;
  fishInfos: string;
  location: object;
  nightFishing: string;
  otherInformations: string;
}

const LocationSchema: Schema = new Schema({
  name: { type: String},
  user: { type: String},
  fishInfos: { type: String},
  location: { type: Object},
  nightFishing: { type: String},
  otherInformations: { type: String}
});

export const LocationModel: Model<ILocation> = model('Location', LocationSchema);