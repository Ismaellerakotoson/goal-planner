import { Goal } from "../entities/goal";

describe('Goal', () => {
  const date = new Date('2026-11-07');

  it('should create a new goal with the provided values', () => {
    const goal = new Goal('G1', 'Travel', date);

    expect(goal).toBeInstanceOf(Goal);
    expect(goal.id).toBe('G1');
    expect(goal.name).toBe('Travel');
    expect(goal.createdAt).toBe(date);
  });

  it('should use default values for optional properties', () => {
    const goal = new Goal('G1', 'Travel');

    expect(goal.estimatedTargetDate).toBeNull();
    expect(goal.steps).toEqual([]);
    expect(goal.contributions).toEqual([]);
    expect(goal.createdAt).toBeInstanceOf(Date);
  });

  it('addContribution plusieurs contributions',() => {
    
  })
});