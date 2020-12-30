import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';
export class ReferenceDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly link: string;

  @ApiProperty()
  readonly category: string;
}

export interface IReference extends Document {
  name: string;
  user: string;
  link: string;
  category: string;
}

const ReferenceSchema: Schema = new Schema({
  name: { type: String},
  user: { type: String},
  link: { type: String},
  category: { type: String}
});

export const ReferenceModel: Model<IReference> = model('Reference', ReferenceSchema);