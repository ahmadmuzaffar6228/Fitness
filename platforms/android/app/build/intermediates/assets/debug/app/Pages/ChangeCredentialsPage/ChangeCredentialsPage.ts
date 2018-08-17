import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Data } from "../../provider";
var Sqlite = require("nativescript-sqlite");


@Component({
    selector: "changecredentialspage",
    templateUrl: "./Pages/ChangeCredentialsPage/ChangeCredentialsPage.html",
    styleUrls: ["./Pages/ChangeCredentialsPage/ChangeCredentialsPage.css"]
})

export class ChangeCredentialsPageComponent {

    private database: any;
    oldUsername: string;
    newUsername: string;
    oldEmail: string;
    newEmail: string;
    oldPassword: string;
    newPassword: string;
    usernameButton: Boolean;
    emailButton: Boolean;
    passwordButton: Boolean;
    combinedView1: boolean;
    combinedView2: boolean;
    combinedView3: boolean;

    public constructor(private router: Router, private data: Data) {

        var obj = JSON.parse(JSON.stringify(this.data.storage));
        this.oldUsername = obj.username;
        this.newUsername = "";
        this.oldEmail = obj.email;
        this.newEmail = "";
        this.oldPassword = "";
        this.newPassword = "";
        this.usernameButton = false;
        this.emailButton = false;
        this.passwordButton = false;
        this.combinedView1 = true;
        this.combinedView2 = true;
        this.combinedView3 = true;
        this.db();

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

        this.database.all("SELECT * FROM loginCredentials").then(rows => {
            for (let row in rows) {
                if (this.oldEmail === rows[row][1]) {
                    this.oldPassword = rows[row][3];
                    break;
                }
            }
        }, error => {
            alert("Select Query Error");
        });

    }

    logout() {
        this.router.navigate(["/firstpage"]);
    }

    toggleUsername() {

        this.usernameButton = !this.usernameButton;
        this.combinedView2 = !this.combinedView2;
        this.combinedView3 = !this.combinedView3;

    }

    toggleEmail() {

        this.emailButton = !this.emailButton;
        this.combinedView1 = !this.combinedView1;
        this.combinedView3 = !this.combinedView3;

    }

    togglePassword() {

        this.passwordButton = !this.passwordButton;
        this.combinedView1 = !this.combinedView1;
        this.combinedView2 = !this.combinedView2;

    }

    public updateUsername() {

        this.database.execSQL("UPDATE loginCredentials SET username=? WHERE email=?", [this.newUsername, this.oldEmail]).then(id => {
            alert("Username Updated SuccessFully!!");
            this.data.storage = {
                "username": this.newUsername 
            };
            this.router.navigate(["/firstpage"]);
        }, error => {
            alert("Username Updating Error!!");
        });
        this.toggleUsername();

    }

    public updateEmail() {

        this.database.execSQL("UPDATE loginCredentials SET email=? WHERE email=?", [this.newEmail, this.oldEmail]).then(id => {
            alert("Email Updated SuccessFully!!");
            this.data.storage = {
                "email": this.newEmail
            };
            this.router.navigate(["/firstpage"]);
        }, error => {
            alert("Email Updating Error!!");
        });
        this.toggleEmail();

    }

    public updatePassword() {

        this.database.execSQL("UPDATE loginCredentials SET password=? WHERE email=?", [this.newPassword, this.oldEmail]).then(id => {
            alert("Password Updated SuccessFully!!");
            this.router.navigate(["/firstpage"]);
        }, error => {
            alert("Password Updating Error!!");
        });
        this.togglePassword();

    }

}