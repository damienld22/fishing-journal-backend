import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

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

  @ApiProperty()
  readonly comments: string;
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
  readonly comments: string;

  @ApiProperty()
  readonly fishes: Array<any>;

  @ApiProperty()
  readonly locationName: string;
}

export interface ISession extends Document {
  start: number;
  end: number;
  location: string;
  otherInformations: string;
  comments: string;
  fishes: Array<any>;
  locationName: string;
  user: string;
}

const SessionSchema: Schema = new Schema({
  start: { type: Number},
  end: { type: Number},
  location: { type: String},
  otherInformations: { type: String},
  comments: { type: String},
  fish: { type: Array},
  locationName: { type: String },
  user: { type: String }
});

export const SessionModel: Model<ISession> = model('Session', SessionSchema);