
class User {
    public name: string;
    private readonly _email: string;
    private password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this._email = email;
        this.password = password;
    }

    showEmail(): string {
        return this.email;
    }

    get email(): string{
        return this._email
    }
}

// 1. Création de l'objet
const user = new User(
    "Ismaelle",
    "ismaelle@gmail.com",
    "123456"
);

// Lecture autorisée
console.log(user.email);

// Modification interdite
//user.email = "new@gmail.com";

// Accès direct interdit
//console.log(user._email);