import type { Condition } from './condition';
import { StepStatus } from './StepStatus';

export class Step {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly conditions: Condition[];
  private _status: StepStatus;

  constructor(
    id: string,
    name: string,
    order: number,
    status: StepStatus,
    conditions: Condition[] = [],
  ) {
    const cleanName = name.trim();
    if (cleanName === '') {
      throw new Error('Step name cannot be empty'); // ta classe d'erreur
    }

    this.id = id;
    this.name = cleanName;
    this.order = order;
    this._status = status;
    this.conditions = conditions;
  }

  get status(): StepStatus {
    return this._status;
  }

  markAsCompleted(): void {
    this.transition(StepStatus.IN_PROGRESS, StepStatus.COMPLETED);
  }

  unblock(): void {
    this.transition(StepStatus.BLOCKED, StepStatus.IN_PROGRESS);
  }

  block(): void {
    this.transition(StepStatus.IN_PROGRESS, StepStatus.BLOCKED);
  }

  private transition(from: StepStatus, to: StepStatus): void {
    if (this._status !== from) {
      throw new Error(`Cannot go from ${this._status} to ${to}`); // ta classe d'erreur
    }
    this._status = to;
  }
}