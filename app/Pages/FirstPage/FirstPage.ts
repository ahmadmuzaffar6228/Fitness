import { Component } from "@angular/core";
import { UserData } from "../../Users/UserData/UserData";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Data } from "../../provider";
var Sqlite = require("nativescript-sqlite");

class User{

    username: string; 
    email: string; 
    password: string;

    public constructor() {
        
        this.username = "";
        this.email = "";
        this.password = "";

    }

}

@Component({
    selector: "firstpage",
    templateUrl: "./Pages/FirstPage/FirstPage.html",
    styleUrls: ["./Pages/FirstPage/FirstPage.css"]
})

export class FirstPageComponent {

    private database: any;
    userData: UserData;
    array: Array<User>;
    isLogging: boolean;

    public constructor(private router: Router, private page: Page, private data: Data) {

        this.array = [];
        this.userData = new UserData("", "");
        this.db();
        this.page.actionBarHidden = true;
        this.isLogging = true;
        
    }

    db(): void {

        (new Sqlite("Fitness.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS Accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, age INTEGER, gender TEXT, foot INTEGER, inches INTEGER, weight DOUBLE, image TEXT)").then(id => {
                this.database = db;
                this.readQuery();
            }, error => {
                alert("DB ERROR");
            });
        }, error => {
            alert("DB ERROR");
        });
    }

    readQuery(): void {

        var i = 0;
        this.database.all("SELECT * FROM Accounts").then(rows => {
            for (var row in rows) {
                var tempUser = new User();
                tempUser.email = rows[row][1];
                tempUser.username = rows[row][2];
                tempUser.password = rows[row][3];
                this.array[i] = tempUser;
                i++;
            }
        }, error => {
            alert("Select Query Error");
        });
    }

    writeQuery(): void {

        this.database.execSQL("INSERT INTO Accounts (email, username, password, age, gender, foot, inches, weight, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.userData.email, this.userData.username, this.userData.password, this.userData.age, this.userData.gender, this.userData.foot, this.userData.inches, this.userData.weight, "~/Images/blank.png"]).then(id => {
            alert("Your Account has been Created Successfully!!");
            this.toggleForm();
        }, error => {
            alert("Insert Query Error")
        });
    }

    checkUser(user: UserData) {
        var count = 0;
        for (var k = 0; k < this.array.length; k++) {
            if (user.email == this.array[k].email) {
                count = 2;
                break;
            }
            if (user.username == this.array[k].username) {
                count = 1;
            }
        }
        return count;
    }

    toggleForm() {
        this.isLogging = !this.isLogging;
    }

    clearTextboxes(){
        this.userData.username = "";
        this.userData.email = "";
        this.userData.password = "";
    }

    submit() {
        if (this.isLogging) {
            this.login();
        }
        else {
            this.signup();
        }
    }

    login() {

        var count = 0;
        if (!this.userData.username || !this.userData.password) {
            alert("Kindly Provide Every Field");
            return;
        }
        else {
            this.readQuery();
            for (let i = 0; i < this.array.length; i++) {
                if (this.userData.username === this.array[i].username && this.userData.password === this.array[i].password) {
                    count = 1;
                    this.data.storage = {
                        "username": this.array[i].username,
                        "email": this.array[i].email
                    };
                    this.router.navigate(["/secondpage"]);
                    break;
                }
            }
            if (count == 0) {
                alert("Account Not Found");
            }
        }
    }

    signup() {

        if (!this.userData.username || !this.userData.email || !this.userData.password || !this.userData.age || !this.userData.gender || !this.userData.foot || !this.userData.inches || !this.userData.weight) {
            alert("Kindly Provide Every Field");
            return;
        }
        else {
            var checkResult = this.checkUser(this.userData);
            if (checkResult == 0) {
                this.writeQuery();
            }
            else if (checkResult == 1) {
                alert("Username Already Taken.... Kindly Choose another one");
            }
            else if (checkResult == 2) {
                alert("Account with Email: " + this.userData.email + " Already Created...Can not Create New One!!")
            }
        }
        this.readQuery();
    }

}
