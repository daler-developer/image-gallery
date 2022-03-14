import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type PostDocument = Post & Document

@Schema()
export class Post {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string[]

  @Prop({ type: String })
  desc: string

  @Prop({ type: String })
  fileUrl: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, default: () => [] }] })
  likes: string[]
}

export const PostSchema = SchemaFactory.createForClass(Post)
