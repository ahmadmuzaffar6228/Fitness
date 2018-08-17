export class UserData{
    image: string;
    password: string;
    username: string;
    email: string;
    foot: number;
    inches: number;
    weight: number;
    age: number;
    gender: string;
    bmi: number;

    public constructor(username: string, email: string){
        this.username = username;
        this.email = email;
        this.password = "";
        this.image = "";
        this.gender = "";
    }
}