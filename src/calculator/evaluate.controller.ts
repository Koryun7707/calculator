import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EvaluateDto } from '@calculator/dto/evaluate.dto';
import { EvaluateService } from '@calculator/evaluate.service';

@Controller('evaluate')
export class EvaluateController {
  constructor(private readonly evaluateService: EvaluateService) {}

  @Post()
  async evaluate(@Body() calculatorDto: EvaluateDto) {
    try {
      const result = this.evaluateService.evaluateExpression(
        calculatorDto.expression,
      );
      return { result };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Invalid expression',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
