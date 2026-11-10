import { ValidationError } from "../errors/ValidationError";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class User {
    public readonly id: string;
    public readonly email: string;
    public readonly passwordHash: string;
    public readonly createdAt: Date;

    constructor(id: string, email: string, passwordHash: string, createdAt: Date){
        if (!id.trim()) throw new ValidationError('User id is required');

        const normalizedEmail = email.trim().toLocaleLowerCase();
        if(!EMAIL_REGEX.test(normalizedEmail)) throw new ValidationError("User email is invalid");

        if(!passwordHash.trim()) throw new ValidationError("User passwordHash is required");
        if(Number.isNaN(createdAt.getTime())) throw new ValidationError("User createdAt is invalid");

        this.id = id;
        this.email = normalizedEmail;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }
}