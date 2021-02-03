import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

export class StationDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly picture: string;

  @ApiProperty()
  readonly location: string;

  @ApiProperty()
  readonly distance: number;

  @ApiProperty()
  readonly depth: number;
  
  @ApiProperty()
  readonly orientation: number;
}

export interface IStation extends Document {
  picture: string;
  location: string;
  distance: number;
  depth: number;
  orientation: number;
}

const StationSchema: Schema = new Schema({
  picture: { type: String },
  location: { type: String },
  distance: { type: Number },
  depth: { type: Number },
  orientation: { type: Number }
});

export const StationModel: Model<IStation> = model('Station', StationSchema);