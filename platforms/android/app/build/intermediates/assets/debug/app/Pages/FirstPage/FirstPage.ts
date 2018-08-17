import { Component, ApplicationInitStatus } from "@angular/core";
import { User } from "../../Users/User/User";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Data } from "../../provider";
var Sqlite = require("nativescript-sqlite");
const timerModule = require("tns-core-modules/timer");

@Component({
    selector: "firstpage",
    templateUrl: "./Pages/FirstPage/FirstPage.html",
    styleUrls: ["./Pages/FirstPage/FirstPage.css"]
})

export class FirstPageComponent {

    private database: any
    array: Array<User>;
    user: User;
    isLogging: boolean;

    public constructor(private router: Router, private page: Page, private data: Data) {

        this.array = [];
        this.db();
        this.page.actionBarHidden = true;
        this.user = new User();
        this.isLogging = true;
        
    }

    db(): void {

        (new Sqlite("Fitness.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS loginCredentials (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL)").then(id => {
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
        this.database.all("SELECT * FROM loginCredentials").then(rows => {
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

        this.database.execSQL("INSERT INTO loginCredentials (email, username, password) VALUES (?, ?, ?)", [this.user.email, this.user.username, this.user.password]).then(id => {
            alert("Your Account has been Created Successfully!!");
            this.toggleForm();
        }, error => {
            alert("Insert Query Error")
        });
    }

    checkUser(user: User) {
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
        this.user.username = "";
        this.user.email = "";
        this.user.password = "";
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
        if (!this.user.username || !this.user.password) {
            alert("Kindly Provide Every Field");
            return;
        }
        else {
            this.readQuery();
            for (let i = 0; i < this.array.length; i++) {
                if (this.user.username === this.array[i].username && this.user.password === this.array[i].password) {
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

        if (!this.user.username || !this.user.email || !this.user.password) {
            alert("Kindly Provide Every Field");
            return;
        }
        else {
            var checkResult = this.checkUser(this.user);
            if (checkResult == 0) {
                this.writeQuery();
            }
            else if (checkResult == 1) {
                alert("Username Already Taken.... Kindly Choose another one");
            }
            else if (checkResult == 2) {
                alert("Account with Email: " + this.user.email + " Already Created...Can not Create New One!!")
            }
        }
        this.readQuery();
    }

}
