import { User } from '../entities/User';
import { ValidationError } from '@/domain/errors/ValidationError';

describe('User', () => {
    const date = new Date('2026-11-07');

  it('normalizes the email', () => {
    const u = new User('u1', '  Test@Mail.COM ', 'hash', date);
    expect(u.email).toBe('test@mail.com');
  });

  it('rejects an invalid email', () => {
    expect(() => new User('u1', 'not-an-email', 'hash', new Date())).toThrow(ValidationError);
  });
});