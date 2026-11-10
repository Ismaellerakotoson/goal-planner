import { Condition } from "./condition";
import { Step } from "./Step";
import { StepStatus } from "./StepStatus";
import type { Goal } from "./Goal";

export class conditionStep extends Condition {
    readonly referencedStep : Step;

    constructor(id: string, order: number, referencedStep: Step){
        super(id,order);
        this.referencedStep = referencedStep
    }

    isSatisfied(_goal: Goal): boolean {
        return this.referencedStep.status === StepStatus.COMPLETED
    }

    estimateDate(_goal: Goal): Date | null {
        return null; // une étape n'a pas de durée : non estimable (voir tes notes de conception)
    }
}