import { ApiProperty } from '@nestjs/swagger';
import { model, Schema, Model, Document } from 'mongoose';

export class AuthenticationDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
});

export const UserModel: Model<IUser> = model('User', UserSchema);