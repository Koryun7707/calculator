import { Module } from '@nestjs/common';
import { EvaluateModule } from '@calculator/evaluate.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [EvaluateModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
