import { Component } from "@angular/core";
import { UserData } from "../../Users/UserData/UserData";
import { Data } from "../../provider";
import { takePicture } from "nativescript-camera";
import * as imageSourceModule from "image-source";
var fs = require("file-system");
var imagePicker = require("nativescript-imagepicker");
import { Router } from "@angular/router";
var Sqlite = require("nativescript-sqlite");
var OpenUrl = require("nativescript-openurl");


@Component({
    selector: "secondpage",
    templateUrl: "./Pages/SecondPage/SecondPage.html",
    styleUrls: ["./Pages/SecondPage/SecondPage.css"]
})

export class SecondPageComponent {

    id: any;
    database: any;
    userData: UserData;
    imageIsOn: boolean;
    hideIcons: boolean;
    progressValue: number;
    bmiCategory: string;
    helpString: string;
    barColor: string;

    public constructor(private data: Data, private router: Router) {

        this.imageIsOn = false;
        this.hideIcons = false;
        var obj = JSON.parse(JSON.stringify(this.data.storage));
        this.userData = new UserData(obj.username, obj.email);
        this.userData.image = "~/Images/blank.png";
        this.progressValue = 0;
        this.db();

    }

    db(): void {

        (new Sqlite("Fitness.db")).then(db => {
            this.database = db;
            this.readData();
        }, error => {
            alert("DB ERROR");
            console.log("error: ", error);
        });

    }

    readData(): void {

        this.database.all("SELECT * FROM Accounts").then(rows => {
            for (let row in rows) {
                if (this.userData.email === rows[row][1]) {
                    let temp = new UserData("", "");
                    this.id = rows[row][0];
                    console.log("Id : ", rows[row][0]);
                    console.log("Id : ", this.id);
                    temp.age = rows[row][4];
                    temp.gender = rows[row][5];
                    temp.foot = rows[row][6];
                    temp.inches = rows[row][7];
                    temp.weight = rows[row][8];
                    temp.image = rows[row][9];
                    temp.bmi = this.bmiCalculator(temp.foot, temp.inches, temp.weight);
                    this.setData(temp);
                }
            }
        }, error => {
            console.log("Error : ", error);
            alert("Read Query ERROR");
        });
    }

    videos(number: number) {

        if (number == 1) {

            OpenUrl("https://www.youtube.com/watch?v=PBC4n4-YnuY&index=2&list=PLLXmeIOBkPXReEHegdHUUR1QojD_7-WK-");

        }
        else if (number == 2) {

            OpenUrl("https://www.youtube.com/watch?v=_CZqfFMxQ4I&index=2&list=PLLXmeIOBkPXSfVneRcF4wafTA_rgYPdXW");

        }
        else if (number == 3) {

            OpenUrl("https://www.youtube.com/watch?v=lA7dbOmxs5I&t=9s");

        }
        else if (number == 4) {

            OpenUrl("https://www.youtube.com/watch?v=tfI6gs1jrHs");

        }
        else if (number == 5) {

            OpenUrl("https://www.youtube.com/watch?v=aJXfalSciFg");

        }
        else if (number == 6) {

            OpenUrl("https://www.youtube.com/watch?v=eVG-KfxPPbk");

        }

    }

    bmiCalculator(foot: number, inch: number, weight: number): number {

        var height = this.convertToMeters(foot, inch);
        let bmi = (weight / (height * height));
        return bmi;

    }

    convertToMeters(foot: number, inch: number): number {

        let heightInMeters = ((foot * 12) + inch) * 0.0254;
        return heightInMeters;

    }

    /*;
    ;
    ;
    this.barColor = "#008000";
    ;*/


    setData(temp: UserData) {

        this.userData.age = temp.age;
        this.userData.gender = temp.gender;
        this.userData.weight = temp.weight;
        this.userData.foot = temp.foot;
        this.userData.inches = temp.inches;
        this.userData.image = temp.image;
        this.userData.bmi = temp.bmi;
        if (this.userData.bmi < 18.5) {

            this.bmiCategory = "Underweight";
            this.barColor = "#00FFFF";
            this.progressValue = 75;
            this.helpString = "We Recommend you to have a healthy daily diet to gain weight!! BEST OF LUCK";

        }
        else if (this.userData.bmi >= 18.5 && this.userData.bmi < 25) {

            this.bmiCategory = "Normal Weight";
            this.barColor = "#8C489F";
            this.progressValue = 100;
            this.helpString = "You have decent Statistics!! KEEP IT UP";

        }
        else if (this.userData.bmi >= 25 && this.userData.bmi < 30) {

            this.bmiCategory = "Overweight";
            this.barColor = "#FFFF00";
            this.progressValue = 60;
            this.helpString = "We Recommend you to start health related exercises to lose weight!! BEST OF LUCK";

        }
        else if (this.userData.bmi > 30) {

            this.bmiCategory = "Obesity";
            this.barColor = "#FF0000";
            this.helpString = "We Recommend you to start jogging or running on treadmill to lose dangerous obesity!! BEST OF LUCK";
            this.progressValue = 40;

        }

    }

    toggleImage() {
        this.imageIsOn = !this.imageIsOn;
    }

    toggleIcons() {
        this.hideIcons = !this.hideIcons;
    }

    uploadImage() {

        var that = this;
        this.toggleImage();
        let context = imagePicker.create({
            mode: "single"
        });
        context.authorize().then(() => {
            return context.present();
        }).then((selection) => {
            selection.forEach(function (select) {
                that.userData.image = select._android;
            });
        }, error => {
            alert("Couldn't upload Image");
        });

    }

    takeImage() {

        var that = this;
        this.toggleImage();
        var milliseconds = (new Date).getTime();
        takePicture({ width: 450, height: 450, cameraFacing: "front" }).then(function (img) {
            let source = new imageSourceModule.ImageSource();
            source.fromAsset(img).then((source) => {
                let folder = fs.knownFolders.documents();
                var path = fs.path.join(folder.path, "SaveImage" + milliseconds + ".jpeg");
                var saved = source.saveToFile(path, "jpeg");
                that.userData.image = path;
            });
        });

    }

    saveDetails() {

        this.imageIsOn = false;
        this.toggleIcons();
        this.database.execSQL("UPDATE Accounts SET age=?, foot=?, inches=?, weight=? , gender=? , image=? WHERE id=? ", [this.userData.age, this.userData.foot, this.userData.inches, this.userData.weight, this.userData.gender, this.userData.image, this.id]).then(id => {
            alert("Details Saved Successfully");
            this.readData();
        }, error => {
            console.log("Error: ", error);
            alert("Update Query Error");
        });

    }

    clearDetails() {

        this.imageIsOn = false;
        this.toggleIcons();
        var obj = JSON.parse(JSON.stringify(this.data.storage));
        this.userData = new UserData(obj.username, obj.email);
        this.userData.image = "~/Images/blank.png";
        this.database.execSQL("UPDATE Accounts SET age=?, foot=?, inches=?, weight=? , gender=? , image=? WHERE id=? ", [this.userData.age, this.userData.foot, this.userData.inches, this.userData.weight, this.userData.gender, this.userData.image, this.id]).then(id => {
            alert("Details Saved Successfully");
            this.readData();
        }, error => {
            console.log("Error: ", error);
            alert("Clear Query Error");
        });

    }

    logout() {

        this.router.navigate(["/firstpage"]);

    }

    done() {

        this.toggleIcons();

    }

    removeImage() {

        this.userData.image = "~/Images/blank.png";
        this.database.execSQL("UPDATE Accounts SET image=? WHERE id=? ", [this.userData.image, this.id]).then(id => {
            alert("Details Saved Successfully");
        }, error => {
            console.log("Error: ", error);
            alert("Update Query Error");
        });

    }

    navigateToChangeCredentialsPage() {

        this.router.navigate(["/changecredentialspage"]);

    }

}
