import { ValidationError } from '../errors/ValidationError';

export class Contribution {
  constructor(
    public readonly id: string,
    public readonly goalId: string,
    public readonly amount: number,
    public readonly date: Date,
  ) {
    if (!id.trim()) throw new ValidationError('Contribution id is required');
    if (!goalId.trim()) throw new ValidationError('Contribution goalId is required');
    if (!Number.isFinite(amount)) throw new ValidationError('Contribution amount must be a number');
    if (amount === 0) throw new ValidationError('Contribution amount cannot be zero');
    if (Number.isNaN(date.getTime())) throw new ValidationError('Contribution date is invalid');
  }
}
