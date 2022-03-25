import { IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @Min(2)
  @Max(15)
  text: string
}
