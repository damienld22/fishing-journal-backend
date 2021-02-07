import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

export interface DecisionHelpCategory {
  category: string;
  elts: Array<any>;
}

export class DecisionHelpDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly parameters: Array<string>;
  
  @ApiProperty()
  readonly elements: Array<DecisionHelpCategory>;
}

export interface IDecisionHelp extends Document {
  parameters: Array<string>;
  elements: Array<DecisionHelpCategory>;
  user: string;
}

const DecisionHelpSchema: Schema = new Schema({
  parameters: { type: Array },
  elements: { type: Array },
  user: { type: String }
});

export const DecisionHelpModel: Model<IDecisionHelp> = model('DecisionHelp', DecisionHelpSchema);