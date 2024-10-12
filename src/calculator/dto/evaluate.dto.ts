import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EvaluateDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[0-9+\-*/().\s]+$/, {
    message:
      'The expression contains invalid characters or an incorrect structure.',
  })
  expression: string;
}
