/*import { conditionStep } from '../entities/conditionStep';
import type { Goal } from '../entities/Goal';
import { Step } from '../entities/Step';
import { StepStatus } from '../entities/StepStatus';

const goal = {} as Goal; // ConditionStep n'utilise pas le goal

const makeCondition = (status: StepStatus) => {
  const step = new Step('s1', 'Visa', 1, status);
  return { step, condition: new conditionStep('c1', 1, step) };
};

describe('ConditionStep', () => {
  it('est satisfaite quand l\'étape référencée est COMPLETED', () => {
    const { step, condition } = makeCondition(StepStatus.IN_PROGRESS);
    step.markAsCompleted();
    expect(condition.isSatisfied(goal)).toBe(true);
  });

  it.each([StepStatus.BLOCKED, StepStatus.IN_PROGRESS])(
    'n\'est pas satisfaite quand l\'étape est %s',
    (status) => {
      const { condition } = makeCondition(status);
      expect(condition.isSatisfied(goal)).toBe(false);
    },
  );

  it('devient satisfaite quand l\'étape passe à COMPLETED', () => {
    const { step, condition } = makeCondition(StepStatus.IN_PROGRESS);
    expect(condition.isSatisfied(goal)).toBe(false);
    step.markAsCompleted();
    expect(condition.isSatisfied(goal)).toBe(true);
  });

  it('estimateDate retourne null', () => {
    const { condition } = makeCondition(StepStatus.IN_PROGRESS);
    expect(condition.estimateDate(goal)).toBeNull();
  });
});*/