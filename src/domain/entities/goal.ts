import type { Contribution } from './Contribution';
import type { Step } from './Step';

export class Goal {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  estimatedTargetDate: Date | null;
  private _steps: Step[];
  private _contributions: Contribution[];

  constructor(
    id: string,
    name: string,
    createdAt: Date = new Date(),
    estimatedTargetDate: Date | null = null,
    steps: Step[] = [],
    contributions: Contribution[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.estimatedTargetDate = estimatedTargetDate;
    this._steps = steps;
    this._contributions = contributions;
  }

  get steps(): Step[] {
    return [...this._steps];
  }

  get contributions(): Contribution[] {
    return [...this._contributions];
  }
}