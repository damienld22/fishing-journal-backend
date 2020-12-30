import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

export class ListDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly elements: Array<ElementListDto>;
}

export class ElementListDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly checked: boolean;

  @ApiProperty()
  readonly category: string;
}

export interface IList extends Document {
  user: string;
  elements: Array<any>
}

const ElementListSchema: Schema = new Schema({
  name: { type: String},
  checked: { type: Boolean},
  category: { type: String }
})

const ListSchema: Schema = new Schema({
  user: { type: String},
  elements: [ElementListSchema]
});

export const ListModel: Model<IList> = model('List', ListSchema);