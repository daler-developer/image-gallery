import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ versionKey: false })
export class User {

  @Prop({ type: String, required: true })
  username: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, required: false })
  avatarUrl: string
}

export const UserSchema = SchemaFactory.createForClass(User)
