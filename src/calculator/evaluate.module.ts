import { Module } from '@nestjs/common';
import { EvaluateController } from '@calculator/evaluate.controller';
import { EvaluateService } from '@calculator/evaluate.service';

@Module({
  imports: [],
  controllers: [EvaluateController],
  providers: [EvaluateService],
  exports: [EvaluateService],
})
export class EvaluateModule {}
