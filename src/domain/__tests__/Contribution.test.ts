import { Contribution } from "../entities/Contribution";
import { ValidationError } from '@/domain/errors/ValidationError';

describe('Contribution', () => {
  const date = new Date('2026-11-07');

  it('creates a valid contribution', () => {
    const c = new Contribution('c1', 'g1', 50000, date);
    expect(c.amount).toBe(50000);
  });

  it('accepts a negative amount as a correction', () => {
    expect(new Contribution('c2', 'g1', -10000, date).amount).toBe(-10000);
  });

  it('rejects a zero amount', () => {
    expect(() => new Contribution('c3', 'g1', 0, date)).toThrow(ValidationError);
  });

  it('rejects an empty goalId', () => {
    expect(() => new Contribution('c4', '  ', 100, date)).toThrow(ValidationError);
  });
});