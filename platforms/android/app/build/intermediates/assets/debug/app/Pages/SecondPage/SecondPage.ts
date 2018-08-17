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
    progressPercentage: string;
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

        var count = 0;
        (new Sqlite("Fitness.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS Accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, age INTEGER, height DOUBLE, weight DOUBLE, gender TEXT, armSize DOUBLE, thighSize DOUBLE, chestSize DOUBLE, image TEXT)").then(id => {
                this.database = db;
                this.database.all("SELECT * from Accounts").then(rows => {
                    for (let row in rows) {
                        if (this.userData.email === rows[row][1]) {
                            count = 1;
                            break;
                        }
                    }
                    if (count == 0) {
                        this.insertData();
                        console.log("Account Inserted in DB");
                    }
                }, error => {
                    alert("Account Not Added in DB");
                });
                this.readData();
            }, error => {
                alert("DB ERROR");
                console.log("error: ", error);
            });
        }, error => {
            alert("DB ERROR");
            console.log("error: ", error);
        });

    }

    insertData(): void {
        this.database.execSQL("INSERT INTO Accounts (email, username, age, height, weight, gender, armSize, thighSize, chestSize, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.userData.email, this.userData.username, this.userData.age, this.userData.height, this.userData.weight, this.userData.gender, this.userData.armSize, this.userData.thighSize, this.userData.chestSize, this.userData.image]).then(id => {
            alert("Account Loaded");
            this.fitnessCalculator();
        }, error => {
            alert("Insert Query Error");
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
                    temp.age = rows[row][3];
                    temp.height = rows[row][4];
                    temp.weight = rows[row][5];
                    temp.gender = rows[row][6];
                    temp.armSize = rows[row][7];
                    temp.thighSize = rows[row][8];
                    temp.chestSize = rows[row][9];
                    temp.image = rows[row][10];
                    this.setData(temp);
                    console.log("Weight 1: ", this.userData.weight);
                    console.log("Height 1: ", this.userData.height);
                    this.fitnessCalculator();
                }
            }
        }, error => {
            console.log("Error : ", error);
            alert("Read Query ERROR");
        });
    }

    videos(number: number){

        if(number == 1){

            OpenUrl("https://www.youtube.com/watch?v=PBC4n4-YnuY&index=2&list=PLLXmeIOBkPXReEHegdHUUR1QojD_7-WK-");

        }
        else if(number == 2){

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

    fitnessCalculator() {

        if (this.userData.height >= 5 && this.userData.height <= 5.6) {

            if (this.userData.weight > 65 && this.userData.weight <= 85) {

                let difference = this.userData.weight - 65;
                this.helpString = "You Need To Improve Your Fitness!!! You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;

            }
            else if (this.userData.weight <= 57 && this.userData.weight >= 50) {

                let difference = 57 - this.userData.weight;
                this.helpString = "You Need To Improve Your Fitness!!! You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 60;

            }
            else if (this.userData.weight < 50) {

                let difference = 57 - this.userData.weight;
                this.helpString = "Your Fitness is in Danger!!! You are very light. You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 35;

            }
            else if (this.userData.weight > 85) {

                let difference = this.userData.weight - 65;
                this.helpString = "Your Fitness is in Danger!!! You are very heavy. You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 25;

            }
            else if (this.userData.weight <= 65 && this.userData.weight >= 57) {

                this.helpString = "You are in Good Health!! Keep Your Fitness Like This Forever!!!";
                this.progressValue = 100 - (65 - this.userData.weight);

            }

        }
        else if (this.userData.height > 5.6 && this.userData.height <= 5.11) {

            if (this.userData.weight > 75 && this.userData.weight <= 90) {

                let difference = this.userData.weight - 75;
                this.helpString = "You Need To Improve Your Fitness!!! You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 60;

            }
            else if (this.userData.weight <= 65 && this.userData.weight >= 55) {

                let difference = 65 - this.userData.weight;
                this.helpString = "You Need To Improve Your Fitness!!! You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;

            }
            else if (this.userData.weight < 55) {

                let difference = 65 - this.userData.weight;
                this.helpString = "Your Fitness is in Danger!!! You are very light. You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 40;

            }
            else if (this.userData.weight > 90) {

                let difference = this.userData.weight - 65;
                this.helpString = "Your Fitness is in Danger!!! You are very heavy. You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 20;
            }
            else if (this.userData.weight <= 75 && this.userData.weight >= 65) {

                this.helpString = "You are in Good Health!! Keep Your Fitness Like This Forever!!!";
                this.progressValue = 100 - (75 - this.userData.weight);

            }

        }
        else if (this.userData.height < 5 && this.userData.height >= 4) {

            if (this.userData.weight > 57 && this.userData.weight <= 65) {

                let difference = this.userData.weight - 57;
                this.helpString = "You Need To Improve Your Fitness!!! You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;

            }
            else if (this.userData.weight <= 50 && this.userData.weight >= 45) {

                let difference = 50 - this.userData.weight;
                this.helpString = "You Need To Improve Your Fitness!!! You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;

            }
            else if (this.userData.weight < 45) {

                let difference = 50 - this.userData.weight;
                this.helpString = "Your Fitness is in Danger!!! You are very light. You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 35;

            }
            else if (this.userData.weight > 65) {

                let difference = this.userData.weight - 57;
                this.helpString = "Your Fitness is in Danger!!! You are very heavy. You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 35;

            }
            else if (this.userData.weight <= 57 && this.userData.weight >= 50) {

                this.helpString = "You are in Good Health!! Keep Your Fitness Like This Forever!!!";
                this.progressValue = 100 - (57 - this.userData.weight);

            }

        }
        else if (this.userData.height < 4) {

            this.helpString = "You Should Increase Your Height atleast half a foot and your Weight should be in 45-55 Kg range!!";
            if (this.userData.weight >= 45 && this.userData.weight <= 55) {

                this.progressValue = 75;

            }
            else {

                this.progressValue = 55;

            }

        }
        else if (this.userData.height >= 6 && this.userData.height < 6.5) {

            if (this.userData.weight < 65 && this.userData.weight >= 58) {

                let difference = 65 - this.userData.weight;
                this.helpString = "Your Fitness is a bit in Danger!!!. You should Gain atleast " + difference + " Kg some more Weight to be in good health!!";
                this.progressValue = 55;

            }
            else if (this.userData.weight >= 65 && this.userData.weight <= 80) {

                this.helpString = "Your Fitness is Good to Go!!!. Keep it Up!!";
                this.progressValue = 100 - (80 - this.userData.weight);

            }
            else if (this.userData.weight <= 100 && this.userData.weight > 80) {

                let difference = this.userData.weight - 80;
                this.helpString = "Your Fitness is a bit in Danger!!!. You should Lose atleast " + difference + " Kg some more Weight to be in good health!!";
                this.progressValue = 55;

            }
            else if (this.userData.weight > 100) {

                let difference = this.userData.weight - 80;
                this.helpString = "It is Disastrous!!!. You should Lose atleast " + difference + " Kg some more Weight to be Stabled!!";
                this.progressValue = 45;

            }
            else if (this.userData.weight < 58) {

                let difference = 65 - this.userData.weight;
                this.helpString = "It is Disastrous!!!. You should Gain atleast " + difference + " Kg some more Weight to be Stabled!!";
                this.progressValue = 35;

            }

        }
        else if (this.userData.height < 4 || this.userData.height > 6.5) {

            if (this.userData.height < 4) {

                this.helpString = "According to your Height, your weight should lie within 35-45 Kg. But you also should increase your height mandatorily";
                if (this.userData.weight > 34 && this.userData.weight < 46) {

                    this.progressValue = 65;

                }
                else if (this.userData.weight > 55) {

                    this.progressValue = 25;

                }
                else {

                    this.progressValue = 55;

                }

            }
            else if (this.userData.height > 6.5) {

                this.helpString = "According to your Height, your weight should lie within 75-90 Kg. If It is not, you must gain/lose weight respectively";
                if (this.userData.weight < 91 && this.userData.weight > 74) {

                    this.progressValue = 100 - (90 - this.userData.weight);

                }
                else if (this.userData.weight < 60) {

                    this.progressValue = 35;

                }
                else {

                    this.progressValue = 65;

                }

            }

        }


        if (this.progressValue < 50) {

            this.barColor = "#FF0000";

        }
        else if (this.progressValue > 80) {

            this.barColor = "#8C489F";

        }
        else if (this.progressValue >= 50 && this.progressValue < 60) {

            this.barColor = "#FFFF00";

        }
        else if (this.progressValue >= 60 && this.progressValue < 70) {

            this.barColor = "#008000";

        }
        else if (this.progressValue >= 70 && this.progressValue <= 80) {

            this.barColor = "#00FFFF";

        }
        this.progressPercentage = String(this.progressValue) + "%";

    }

    setData(temp: UserData) {
        this.userData.age = temp.age;
        this.userData.gender = temp.gender;
        this.userData.weight = temp.weight;
        this.userData.height = temp.height;
        this.userData.armSize = temp.armSize;
        this.userData.thighSize = temp.thighSize;
        this.userData.chestSize = temp.chestSize;
        this.userData.image = temp.image;
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
        this.database.execSQL("UPDATE Accounts SET age=?, height=? , weight=? , gender=? , armSize=? , thighSize=? , chestSize=? , image=? WHERE id=? ", [this.userData.age, this.userData.height, this.userData.weight, this.userData.gender, this.userData.armSize, this.userData.thighSize, this.userData.chestSize, this.userData.image, this.id]).then(id => {
            alert("Details Saved Successfully");
        }, error => {
            console.log("Error: ", error);
            alert("Update Query Error");
        });
        this.fitnessCalculator();

    }

    clearDetails() {

        this.imageIsOn = false;
        this.toggleIcons();
        var obj = JSON.parse(JSON.stringify(this.data.storage));
        this.userData = new UserData(obj.username, obj.email);
        this.userData.image = "~/Images/blank.png";
        this.database.execSQL("UPDATE Accounts SET age=?, height=? , weight=? , gender=? , armSize=? , thighSize=? , chestSize=? , image=? WHERE id=? ", [this.userData.age, this.userData.height, this.userData.weight, this.userData.gender, this.userData.armSize, this.userData.thighSize, this.userData.chestSize, this.userData.image, this.id]).then(id => {
            alert("Details Saved Successfully");
        }, error => {
            console.log("Error: ", error);
            alert("Clear Query Error");
        });
        this.progressValue = 0;
        this.fitnessCalculator();

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
