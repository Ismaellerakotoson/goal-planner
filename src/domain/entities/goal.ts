import type { Contribution } from './contribution';
import type { Step } from './step';
import { StepStatus } from './stepStatus';

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

  addSteps(step: Step): void{
    this._steps.push(step);
  }

  addContribution(contribution: Contribution): void {
    this._contributions.push(contribution);
  }

  totalSaved(): number {
    return this._contributions.reduce((sum,c) => sum + c.amount,0);
  }

  progress():number {
    if(this._steps.length === 0) return 0;
    const done = this._steps.filter((s)=>s.status === StepStatus.COMPLETED).length;
    return (done / this._steps.length) * 100;
  }
}