import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type PostDocument = Post & Document

@Schema({ versionKey: false })
export class Post {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: string

  @Prop({ type: String, required: true })
  desc: string

  @Prop({ type: String, required: true })
  fileUrl: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, default: () => [] }], required: true })
  likes: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, default: () => [] }], required: true })
  comments: string[]
}

export const PostSchema = SchemaFactory.createForClass(Post)
