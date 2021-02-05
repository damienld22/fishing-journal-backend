import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

export class StationDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly markers: Array<any>;

  @ApiProperty()
  readonly picture: string;

  @ApiProperty()
  readonly location: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly distance: number;

  @ApiProperty()
  readonly depth: number;
  
  @ApiProperty()
  readonly orientation: number;
}

export interface IStation extends Document {
  name: string;
  picture: string;
  markers: any[];
  user: string;
  location: string;
  distance: number;
  depth: number;
  orientation: number;
  description: string;
}

const StationSchema: Schema = new Schema({
  name: { type: String },
  picture: { type: String },
  markers: { type: Array },
  user: { type: String},
  location: { type: String },
  description: { type: String },
  distance: { type: Number },
  depth: { type: Number },
  orientation: { type: Number }
});

export const StationModel: Model<IStation> = model('Station', StationSchema);