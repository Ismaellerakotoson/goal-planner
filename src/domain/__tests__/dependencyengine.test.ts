import { DependencyEngine } from '../services/dependencyengine';
import { conditionStep } from '../entities/conditionStep';
import { Goal } from '../entities/goal';
import { Step } from '../entities/step';
import { StepStatus } from '../entities/stepStatus';

const makeStep = (id: string) => new Step(id, `Étape ${id}`, 1, StepStatus.BLOCKED);

const link = (from: Step, to: Step) =>
  from.conditions.push(new ConditionStep(`${from.id}->${to.id}`, 1, to));

const makeGoal = (...steps: Step[]) => {
  const goal = new Goal('g1', 'Objectif test');
  steps.forEach((s) => goal.addStep(s));
  return goal;
};

describe('DependencyEngine', () => {
  const engine = new DependencyEngine();

  it('pas de cycle', () => {
    const a = makeStep('A');
    const b = makeStep('B');
    link(a, b);
    expect(engine.hasCycle(makeGoal(a, b))).toBe(false);
  });

  it('cycle direct A->B->A', () => {
    const a = makeStep('A');
    const b = makeStep('B');
    link(a, b);
    link(b, a);
    expect(engine.hasCycle(makeGoal(a, b))).toBe(true);
  });

  // à toi : cycle indirect A->B->C->A, auto-référence A->A,
  // wouldCreateCycle (cas vrai et cas faux),
  // et le cas du losange A->B, A->C, B->D, C->D (pas de cycle)
});