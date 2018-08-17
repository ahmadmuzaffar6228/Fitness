export class UserData{
    image: string;
    username: string;
    email: string;
    height: number;
    weight: number;
    age: number;
    gender: string;
    armSize: number;
    thighSize: number;
    chestSize: number;

    public constructor(username: string, email: string){
        this.username = username;
        this.email = email;
    }
}