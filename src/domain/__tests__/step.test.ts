import { Step } from "../entities/Step";
import { StepStatus } from '../entities/StepStatus';

const makeStep = (status: StepStatus, name = "Passer le test d'anglais") =>
  new Step('s1', name, 1, status);

describe('Step', () => {
  describe('transitions valides', () => {
    it('markAsCompleted() : IN_PROGRESS -> COMPLETED', () => {
      const step = makeStep(StepStatus.IN_PROGRESS);
      step.markAsCompleted();
      expect(step.status).toBe(StepStatus.COMPLETED);
    });

    it('unblock() : BLOCKED -> IN_PROGRESS', () => {
      const step = makeStep(StepStatus.BLOCKED);
      step.unblock();
      expect(step.status).toBe(StepStatus.IN_PROGRESS);
    });

    it('block() : IN_PROGRESS -> BLOCKED', () => {
      const step = makeStep(StepStatus.IN_PROGRESS);
      step.block();
      expect(step.status).toBe(StepStatus.BLOCKED);
    });
  });

  describe('transitions interdites', () => {
    it.each([
      ['markAsCompleted', StepStatus.BLOCKED],
      ['markAsCompleted', StepStatus.COMPLETED],
      ['unblock', StepStatus.IN_PROGRESS],
      ['unblock', StepStatus.COMPLETED],
      ['block', StepStatus.BLOCKED],
      ['block', StepStatus.COMPLETED],
    ] as const)('%s() depuis %s lève une erreur', (method, from) => {
      const step = makeStep(from);
      expect(() => step[method]()).toThrow();
      expect(step.status).toBe(from);
    });
  });

  describe('nom', () => {
    it.each(['', '   '])('refuse le nom %j', (name) => {
      expect(() => makeStep(StepStatus.BLOCKED, name)).toThrow();
    });

    it('supprime les espaces autour du nom', () => {
      const step = makeStep(StepStatus.BLOCKED, '  Visa  ');
      expect(step.name).toBe('Visa');
    });
  });
});