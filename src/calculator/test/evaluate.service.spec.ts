import { Test, TestingModule } from '@nestjs/testing';
import { EvaluateService } from '@calculator/evaluate.service';

describe('EvaluateService', () => {
  let service: EvaluateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluateService],
    }).compile();

    service = module.get<EvaluateService>(EvaluateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('evaluateExpression', () => {
    it('should evaluate simple addition', () => {
      expect(service.evaluateExpression('1 + 2')).toBe(3);
    });

    it('should evaluate simple subtraction', () => {
      expect(service.evaluateExpression('5 - 2')).toBe(3);
    });

    it('should evaluate simple multiplication', () => {
      expect(service.evaluateExpression('3 * 4')).toBe(12);
    });

    it('should evaluate simple division', () => {
      expect(service.evaluateExpression('8 / 4')).toBe(2);
    });

    it('should handle operator precedence', () => {
      expect(service.evaluateExpression('3 + 5 * 2')).toBe(13);
      expect(service.evaluateExpression('10 - 2 * 3')).toBe(4);
      expect(service.evaluateExpression('2 + 3 * 4 - 1')).toBe(13);
    });

    it('should handle parentheses', () => {
      expect(service.evaluateExpression('(1 + 2) * 3')).toBe(9);
      expect(service.evaluateExpression('3 * (2 + 1)')).toBe(9);
      expect(service.evaluateExpression('(3 + 5) / 2')).toBe(4);
    });

    it('should handle negative numbers', () => {
      expect(service.evaluateExpression('-1 + 2')).toBe(1);
      expect(service.evaluateExpression('5 + -3')).toBe(2);
      expect(service.evaluateExpression('-1 * -1')).toBe(1);
    });

    it('should throw error for division by zero', () => {
      expect(() => service.evaluateExpression('5 / 0')).toThrow(
        'Division by zero',
      );
    });

    it('should throw error for mismatched parentheses', () => {
      expect(() => service.evaluateExpression('((1 + 2)')).toThrow(
        'Mismatched parentheses: unclosed opening parentheses',
      );
      expect(() => service.evaluateExpression('1 + 2)')).toThrow(
        'Mismatched parentheses: too many closing parentheses',
      );
    });

    it('should throw error for invalid expressions', () => {
      expect(() => service.evaluateExpression('1 + + 2')).toThrow(
        'Invalid expression: operator without preceding operand',
      );
      expect(() => service.evaluateExpression('5 *')).toThrow(
        'Invalid expression',
      );
      expect(() => service.evaluateExpression('a + b')).toThrow(
        'Invalid character in expression',
      );
    });

    it('should throw error for invalid negative number expression', () => {
      expect(() => service.evaluateExpression('-')).toThrow(
        'Invalid expression for negative number',
      );
      expect(() => service.evaluateExpression('1 -')).toThrow(
        'Invalid expression: operator without following operand',
      );
    });
  });
});
