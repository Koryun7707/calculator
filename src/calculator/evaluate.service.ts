import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluateService {
  private precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  private isOperator(c: string): boolean {
    return ['+', '-', '*', '/'].includes(c);
  }

  private applyOperator(operators: string[], operands: number[]): void {
    const operator = operators.pop();
    const b = operands.pop();
    const a = operands.pop();

    if (operator === '/' && b === 0) {
      throw new Error('Division by zero');
    }

    let result: number;
    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
    operands.push(result);
  }

  private greaterPrecedence(op1: string, op2: string): boolean {
    return this.precedence[op1] > this.precedence[op2];
  }

  evaluateExpression(expression: string): number {
    const operators: string[] = [];
    const operands: number[] = [];
    const tokens = expression
      .replace(/\s+/g, '')
      .split(/([+\-*/()])/)
      .filter(Boolean);

    let openParentheses = 0;
    let lastToken = '';

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // Handle negative numbers and unary negation
      if (!isNaN(Number(token))) {
        operands.push(Number(token));
        lastToken = token;
      } else if (
        token === '-' &&
        (lastToken === '' || lastToken === '(' || this.isOperator(lastToken))
      ) {
        // Handle unary negation
        let numberStr = '-';
        i++; // Move to the next token
        if (i < tokens.length && !isNaN(Number(tokens[i]))) {
          numberStr += tokens[i]; // Append the number
          operands.push(Number(numberStr));
          lastToken = numberStr;
        } else {
          throw new Error('Invalid expression for negative number');
        }
      } else if (token === '(') {
        operators.push(token);
        openParentheses++;
        lastToken = token;
      } else if (token === ')') {
        openParentheses--;
        if (openParentheses < 0) {
          throw new Error(
            'Mismatched parentheses: too many closing parentheses',
          );
        }
        while (operators.length && operators[operators.length - 1] !== '(') {
          this.applyOperator(operators, operands);
        }
        operators.pop(); // Remove '('
        lastToken = token;
      } else if (this.isOperator(token)) {
        if (
          this.isOperator(lastToken) ||
          lastToken === '(' ||
          lastToken === ''
        ) {
          throw new Error(
            'Invalid expression: operator without preceding operand',
          );
        }

        while (
          operators.length &&
          operators[operators.length - 1] !== '(' &&
          this.greaterPrecedence(operators[operators.length - 1], token)
        ) {
          this.applyOperator(operators, operands);
        }
        operators.push(token);
        lastToken = token;
      } else {
        throw new Error('Invalid character in expression');
      }
    }

    // Check for correct number of parentheses
    if (openParentheses !== 0) {
      throw new Error('Mismatched parentheses: unclosed opening parentheses');
    }

    // Check if the last token is an operator
    if (this.isOperator(lastToken)) {
      throw new Error('Invalid expression: operator without following operand');
    }

    // Apply remaining operators
    while (operators.length) {
      if (operators[operators.length - 1] === '(') {
        throw new Error('Mismatched parentheses: unclosed opening parentheses');
      }
      this.applyOperator(operators, operands);
    }

    if (operands.length !== 1) {
      throw new Error('Invalid expression');
    }

    return operands.pop()!;
  }
}
