import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Document } from 'mongoose'

export type CommentDocument = Comment & Document

@Schema()
export class Comment {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator: string

  @Prop({ type: String, required: true })
  text: string

}

export const CommentSchema = SchemaFactory.createForClass(Comment)
