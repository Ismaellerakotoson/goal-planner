import type { Goal } from "./Goal";

export abstract class Condition {
  readonly id: string;
  readonly order: number;

  constructor(id: string, order: number) {
    this.id = id;
    this.order = order;
  }

  abstract isSatisfied(goal: Goal): boolean;
  abstract estimateDate(goal: Goal): Date | null;
}