"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserData_1 = require("../../Users/UserData/UserData");
var provider_1 = require("../../provider");
var nativescript_camera_1 = require("nativescript-camera");
var imageSourceModule = require("image-source");
var fs = require("file-system");
var imagePicker = require("nativescript-imagepicker");
var router_1 = require("@angular/router");
var Sqlite = require("nativescript-sqlite");
var OpenUrl = require("nativescript-openurl");
var SecondPageComponent = /** @class */ (function () {
    function SecondPageComponent(data, router) {
        this.data = data;
        this.router = router;
        this.imageIsOn = false;
        this.hideIcons = false;
        var obj = JSON.parse(JSON.stringify(this.data.storage));
        this.userData = new UserData_1.UserData(obj.username, obj.email);
        this.userData.image = "~/Images/blank.png";
        this.progressValue = 0;
        this.db();
    }
    SecondPageComponent.prototype.db = function () {
        var _this = this;
        var count = 0;
        (new Sqlite("Fitness.db")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS Accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, age INTEGER, height DOUBLE, weight DOUBLE, gender TEXT, armSize DOUBLE, thighSize DOUBLE, chestSize DOUBLE, image TEXT)").then(function (id) {
                _this.database = db;
                _this.database.all("SELECT * from Accounts").then(function (rows) {
                    for (var row in rows) {
                        if (_this.userData.email === rows[row][1]) {
                            count = 1;
                            break;
                        }
                    }
                    if (count == 0) {
                        _this.insertData();
                        console.log("Account Inserted in DB");
                    }
                }, function (error) {
                    alert("Account Not Added in DB");
                });
                _this.readData();
            }, function (error) {
                alert("DB ERROR");
                console.log("error: ", error);
            });
        }, function (error) {
            alert("DB ERROR");
            console.log("error: ", error);
        });
    };
    SecondPageComponent.prototype.insertData = function () {
        var _this = this;
        this.database.execSQL("INSERT INTO Accounts (email, username, age, height, weight, gender, armSize, thighSize, chestSize, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.userData.email, this.userData.username, this.userData.age, this.userData.height, this.userData.weight, this.userData.gender, this.userData.armSize, this.userData.thighSize, this.userData.chestSize, this.userData.image]).then(function (id) {
            alert("Account Loaded");
            _this.fitnessCalculator();
        }, function (error) {
            alert("Insert Query Error");
        });
    };
    SecondPageComponent.prototype.readData = function () {
        var _this = this;
        this.database.all("SELECT * FROM Accounts").then(function (rows) {
            for (var row in rows) {
                if (_this.userData.email === rows[row][1]) {
                    var temp = new UserData_1.UserData("", "");
                    _this.id = rows[row][0];
                    console.log("Id : ", rows[row][0]);
                    console.log("Id : ", _this.id);
                    temp.age = rows[row][3];
                    temp.height = rows[row][4];
                    temp.weight = rows[row][5];
                    temp.gender = rows[row][6];
                    temp.armSize = rows[row][7];
                    temp.thighSize = rows[row][8];
                    temp.chestSize = rows[row][9];
                    temp.image = rows[row][10];
                    _this.setData(temp);
                    console.log("Weight 1: ", _this.userData.weight);
                    console.log("Height 1: ", _this.userData.height);
                    _this.fitnessCalculator();
                }
            }
        }, function (error) {
            console.log("Error : ", error);
            alert("Read Query ERROR");
        });
    };
    SecondPageComponent.prototype.videos = function (number) {
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
    };
    SecondPageComponent.prototype.fitnessCalculator = function () {
        if (this.userData.height >= 5 && this.userData.height <= 5.6) {
            if (this.userData.weight > 65 && this.userData.weight <= 85) {
                var difference = this.userData.weight - 65;
                this.helpString = "You Need To Improve Your Fitness!!! You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;
            }
            else if (this.userData.weight <= 57 && this.userData.weight >= 50) {
                var difference = 57 - this.userData.weight;
                this.helpString = "You Need To Improve Your Fitness!!! You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 60;
            }
            else if (this.userData.weight < 50) {
                var difference = 57 - this.userData.weight;
                this.helpString = "Your Fitness is in Danger!!! You are very light. You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 35;
            }
            else if (this.userData.weight > 85) {
                var difference = this.userData.weight - 65;
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
                var difference = this.userData.weight - 75;
                this.helpString = "You Need To Improve Your Fitness!!! You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 60;
            }
            else if (this.userData.weight <= 65 && this.userData.weight >= 55) {
                var difference = 65 - this.userData.weight;
                this.helpString = "You Need To Improve Your Fitness!!! You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;
            }
            else if (this.userData.weight < 55) {
                var difference = 65 - this.userData.weight;
                this.helpString = "Your Fitness is in Danger!!! You are very light. You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 40;
            }
            else if (this.userData.weight > 90) {
                var difference = this.userData.weight - 65;
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
                var difference = this.userData.weight - 57;
                this.helpString = "You Need To Improve Your Fitness!!! You must Lose atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;
            }
            else if (this.userData.weight <= 50 && this.userData.weight >= 45) {
                var difference = 50 - this.userData.weight;
                this.helpString = "You Need To Improve Your Fitness!!! You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 55;
            }
            else if (this.userData.weight < 45) {
                var difference = 50 - this.userData.weight;
                this.helpString = "Your Fitness is in Danger!!! You are very light. You must Gain atleast " + difference + " Kg to be in good health!!";
                this.progressValue = 35;
            }
            else if (this.userData.weight > 65) {
                var difference = this.userData.weight - 57;
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
                var difference = 65 - this.userData.weight;
                this.helpString = "Your Fitness is a bit in Danger!!!. You should Gain atleast " + difference + " Kg some more Weight to be in good health!!";
                this.progressValue = 55;
            }
            else if (this.userData.weight >= 65 && this.userData.weight <= 80) {
                this.helpString = "Your Fitness is Good to Go!!!. Keep it Up!!";
                this.progressValue = 100 - (80 - this.userData.weight);
            }
            else if (this.userData.weight <= 100 && this.userData.weight > 80) {
                var difference = this.userData.weight - 80;
                this.helpString = "Your Fitness is a bit in Danger!!!. You should Lose atleast " + difference + " Kg some more Weight to be in good health!!";
                this.progressValue = 55;
            }
            else if (this.userData.weight > 100) {
                var difference = this.userData.weight - 80;
                this.helpString = "It is Disastrous!!!. You should Lose atleast " + difference + " Kg some more Weight to be Stabled!!";
                this.progressValue = 45;
            }
            else if (this.userData.weight < 58) {
                var difference = 65 - this.userData.weight;
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
    };
    SecondPageComponent.prototype.setData = function (temp) {
        this.userData.age = temp.age;
        this.userData.gender = temp.gender;
        this.userData.weight = temp.weight;
        this.userData.height = temp.height;
        this.userData.armSize = temp.armSize;
        this.userData.thighSize = temp.thighSize;
        this.userData.chestSize = temp.chestSize;
        this.userData.image = temp.image;
    };
    SecondPageComponent.prototype.toggleImage = function () {
        this.imageIsOn = !this.imageIsOn;
    };
    SecondPageComponent.prototype.toggleIcons = function () {
        this.hideIcons = !this.hideIcons;
    };
    SecondPageComponent.prototype.uploadImage = function () {
        var that = this;
        this.toggleImage();
        var context = imagePicker.create({
            mode: "single"
        });
        context.authorize().then(function () {
            return context.present();
        }).then(function (selection) {
            selection.forEach(function (select) {
                that.userData.image = select._android;
            });
        }, function (error) {
            alert("Couldn't upload Image");
        });
    };
    SecondPageComponent.prototype.takeImage = function () {
        var that = this;
        this.toggleImage();
        var milliseconds = (new Date).getTime();
        nativescript_camera_1.takePicture({ width: 450, height: 450, cameraFacing: "front" }).then(function (img) {
            var source = new imageSourceModule.ImageSource();
            source.fromAsset(img).then(function (source) {
                var folder = fs.knownFolders.documents();
                var path = fs.path.join(folder.path, "SaveImage" + milliseconds + ".jpeg");
                var saved = source.saveToFile(path, "jpeg");
                that.userData.image = path;
            });
        });
    };
    SecondPageComponent.prototype.saveDetails = function () {
        this.imageIsOn = false;
        this.toggleIcons();
        this.database.execSQL("UPDATE Accounts SET age=?, height=? , weight=? , gender=? , armSize=? , thighSize=? , chestSize=? , image=? WHERE id=? ", [this.userData.age, this.userData.height, this.userData.weight, this.userData.gender, this.userData.armSize, this.userData.thighSize, this.userData.chestSize, this.userData.image, this.id]).then(function (id) {
            alert("Details Saved Successfully");
        }, function (error) {
            console.log("Error: ", error);
            alert("Update Query Error");
        });
        this.fitnessCalculator();
    };
    SecondPageComponent.prototype.clearDetails = function () {
        this.imageIsOn = false;
        this.toggleIcons();
        var obj = JSON.parse(JSON.stringify(this.data.storage));
        this.userData = new UserData_1.UserData(obj.username, obj.email);
        this.userData.image = "~/Images/blank.png";
        this.database.execSQL("UPDATE Accounts SET age=?, height=? , weight=? , gender=? , armSize=? , thighSize=? , chestSize=? , image=? WHERE id=? ", [this.userData.age, this.userData.height, this.userData.weight, this.userData.gender, this.userData.armSize, this.userData.thighSize, this.userData.chestSize, this.userData.image, this.id]).then(function (id) {
            alert("Details Saved Successfully");
        }, function (error) {
            console.log("Error: ", error);
            alert("Clear Query Error");
        });
        this.progressValue = 0;
        this.fitnessCalculator();
    };
    SecondPageComponent.prototype.logout = function () {
        this.router.navigate(["/firstpage"]);
    };
    SecondPageComponent.prototype.done = function () {
        this.toggleIcons();
    };
    SecondPageComponent.prototype.removeImage = function () {
        this.userData.image = "~/Images/blank.png";
        this.database.execSQL("UPDATE Accounts SET image=? WHERE id=? ", [this.userData.image, this.id]).then(function (id) {
            alert("Details Saved Successfully");
        }, function (error) {
            console.log("Error: ", error);
            alert("Update Query Error");
        });
    };
    SecondPageComponent.prototype.navigateToChangeCredentialsPage = function () {
        this.router.navigate(["/changecredentialspage"]);
    };
    SecondPageComponent = __decorate([
        core_1.Component({
            selector: "secondpage",
            templateUrl: "./Pages/SecondPage/SecondPage.html",
            styleUrls: ["./Pages/SecondPage/SecondPage.css"]
        }),
        __metadata("design:paramtypes", [provider_1.Data, router_1.Router])
    ], SecondPageComponent);
    return SecondPageComponent;
}());
exports.SecondPageComponent = SecondPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vjb25kUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlY29uZFBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMERBQXlEO0FBQ3pELDJDQUFzQztBQUN0QywyREFBa0Q7QUFDbEQsZ0RBQWtEO0FBQ2xELElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCwwQ0FBeUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFTOUM7SUFZSSw2QkFBMkIsSUFBVSxFQUFVLE1BQWM7UUFBbEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFZCxDQUFDO0lBRUQsZ0NBQUUsR0FBRjtRQUFBLGlCQThCQztRQTVCRyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7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QzVCLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWhFLElBQUksQ0FBQyxVQUFVLEdBQUcsaUVBQWlFLENBQUM7Z0JBQ3BGLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0QsQ0FBQztRQUVMLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTFELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyw0REFBNEQsR0FBRyxVQUFVLEdBQUcsNEJBQTRCLENBQUM7Z0JBQzNILElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBRTVCLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWhFLElBQUksVUFBVSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyw0REFBNEQsR0FBRyxV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QztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDcEcsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELDZEQUErQixHQUEvQjtRQUVJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO0lBRXJELENBQUM7SUF4ZVEsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ25ELENBQUM7eUNBY21DLGVBQUksRUFBa0IsZUFBTTtPQVpwRCxtQkFBbUIsQ0EwZS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTFlRCxJQTBlQztBQTFlWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vVXNlcnMvVXNlckRhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vcHJvdmlkZXJcIjtcbmltcG9ydCB7IHRha2VQaWN0dXJlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlTW9kdWxlIGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbnZhciBmcyA9IHJlcXVpcmUoXCJmaWxlLXN5c3RlbVwiKTtcbnZhciBpbWFnZVBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIik7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG52YXIgT3BlblVybCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtb3BlbnVybFwiKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzZWNvbmRwYWdlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9QYWdlcy9TZWNvbmRQYWdlL1NlY29uZFBhZ2UuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9QYWdlcy9TZWNvbmRQYWdlL1NlY29uZFBhZ2UuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgU2Vjb25kUGFnZUNvbXBvbmVudCB7XG5cbiAgICBpZDogYW55O1xuICAgIGRhdGFiYXNlOiBhbnk7XG4gICAgdXNlckRhdGE6IFVzZXJEYXRhO1xuICAgIGltYWdlSXNPbjogYm9vbGVhbjtcbiAgICBoaWRlSWNvbnM6IGJvb2xlYW47XG4gICAgcHJvZ3Jlc3NWYWx1ZTogbnVtYmVyO1xuICAgIHByb2dyZXNzUGVyY2VudGFnZTogc3RyaW5nO1xuICAgIGhlbHBTdHJpbmc6IHN0cmluZztcbiAgICBiYXJDb2xvcjogc3RyaW5nO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YTogRGF0YSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgICAgIHRoaXMuaW1hZ2VJc09uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZUljb25zID0gZmFsc2U7XG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YS5zdG9yYWdlKSk7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSBuZXcgVXNlckRhdGEob2JqLnVzZXJuYW1lLCBvYmouZW1haWwpO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLmltYWdlID0gXCJ+L0ltYWdlcy9ibGFuay5wbmdcIjtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5kYigpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkYigpOiB2b2lkIHtcblxuICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAobmV3IFNxbGl0ZShcIkZpdG5lc3MuZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIuZXhlY1NRTChcIkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIEFjY291bnRzIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsIGVtYWlsIFRFWFQgTk9UIE5VTEwsIHVzZXJuYW1lIFRFWFQgTk9UIE5VTEwsIGFnZSBJTlRFR0VSLCBoZWlnaHQgRE9VQkxFLCB3ZWlnaHQgRE9VQkxFLCBnZW5kZXIgVEVYVCwgYXJtU2l6ZSBET1VCTEUsIHRoaWdoU2l6ZSBET1VCTEUsIGNoZXN0U2l6ZSBET1VCTEUsIGltYWdlIFRFWFQpXCIpLnRoZW4oaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIGZyb20gQWNjb3VudHNcIikudGhlbihyb3dzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmVtYWlsID09PSByb3dzW3Jvd11bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY2NvdW50IEluc2VydGVkIGluIERCXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkFjY291bnQgTm90IEFkZGVkIGluIERCXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZERhdGEoKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkRCIEVSUk9SXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJEQiBFUlJPUlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgaW5zZXJ0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gQWNjb3VudHMgKGVtYWlsLCB1c2VybmFtZSwgYWdlLCBoZWlnaHQsIHdlaWdodCwgZ2VuZGVyLCBhcm1TaXplLCB0aGlnaFNpemUsIGNoZXN0U2l6ZSwgaW1hZ2UpIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPywgPywgPywgPylcIiwgW3RoaXMudXNlckRhdGEuZW1haWwsIHRoaXMudXNlckRhdGEudXNlcm5hbWUsIHRoaXMudXNlckRhdGEuYWdlLCB0aGlzLnVzZXJEYXRhLmhlaWdodCwgdGhpcy51c2VyRGF0YS53ZWlnaHQsIHRoaXMudXNlckRhdGEuZ2VuZGVyLCB0aGlzLnVzZXJEYXRhLmFybVNpemUsIHRoaXMudXNlckRhdGEudGhpZ2hTaXplLCB0aGlzLnVzZXJEYXRhLmNoZXN0U2l6ZSwgdGhpcy51c2VyRGF0YS5pbWFnZV0pLnRoZW4oaWQgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJBY2NvdW50IExvYWRlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuZml0bmVzc0NhbGN1bGF0b3IoKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJJbnNlcnQgUXVlcnkgRXJyb3JcIik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmVhZERhdGEoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIEFjY291bnRzXCIpLnRoZW4ocm93cyA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmVtYWlsID09PSByb3dzW3Jvd11bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBuZXcgVXNlckRhdGEoXCJcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWQgPSByb3dzW3Jvd11bMF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSWQgOiBcIiwgcm93c1tyb3ddWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJZCA6IFwiLCB0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5hZ2UgPSByb3dzW3Jvd11bM107XG4gICAgICAgICAgICAgICAgICAgIHRlbXAuaGVpZ2h0ID0gcm93c1tyb3ddWzRdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wLndlaWdodCA9IHJvd3Nbcm93XVs1XTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5nZW5kZXIgPSByb3dzW3Jvd11bNl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXAuYXJtU2l6ZSA9IHJvd3Nbcm93XVs3XTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcC50aGlnaFNpemUgPSByb3dzW3Jvd11bOF07XG4gICAgICAgICAgICAgICAgICAgIHRlbXAuY2hlc3RTaXplID0gcm93c1tyb3ddWzldO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wLmltYWdlID0gcm93c1tyb3ddWzEwXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHRlbXApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlaWdodCAxOiBcIiwgdGhpcy51c2VyRGF0YS53ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlaWdodCAxOiBcIiwgdGhpcy51c2VyRGF0YS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpdG5lc3NDYWxjdWxhdG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIDogXCIsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KFwiUmVhZCBRdWVyeSBFUlJPUlwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlkZW9zKG51bWJlcjogbnVtYmVyKXtcblxuICAgICAgICBpZihudW1iZXIgPT0gMSl7XG5cbiAgICAgICAgICAgIE9wZW5VcmwoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PVBCQzRuNC1ZbnVZJmluZGV4PTImbGlzdD1QTExYbWVJT0JrUFhSZUVIZWdkSFVVUjFRb2pEXzctV0stXCIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihudW1iZXIgPT0gMil7XG5cbiAgICAgICAgICAgIE9wZW5VcmwoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PV9DWnFmRk14UTRJJmluZGV4PTImbGlzdD1QTExYbWVJT0JrUFhTZlZuZVJjRjR3YWZUQV9yZ1lQZFhXXCIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtYmVyID09IDMpIHtcblxuICAgICAgICAgICAgT3BlblVybChcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9bEE3ZGJPbXhzNUkmdD05c1wiKTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bWJlciA9PSA0KSB7XG5cbiAgICAgICAgICAgIE9wZW5VcmwoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PXRmSTZnczFqckhzXCIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtYmVyID09IDUpIHtcblxuICAgICAgICAgICAgT3BlblVybChcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9YUpYZmFsU2NpRmdcIik7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChudW1iZXIgPT0gNikge1xuXG4gICAgICAgICAgICBPcGVuVXJsKFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1lVkctS2Z4UFBia1wiKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmaXRuZXNzQ2FsY3VsYXRvcigpIHtcblxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWlnaHQgPj0gNSAmJiB0aGlzLnVzZXJEYXRhLmhlaWdodCA8PSA1LjYpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0ID4gNjUgJiYgdGhpcy51c2VyRGF0YS53ZWlnaHQgPD0gODUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy51c2VyRGF0YS53ZWlnaHQgLSA2NTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdSBOZWVkIFRvIEltcHJvdmUgWW91ciBGaXRuZXNzISEhIFlvdSBtdXN0IExvc2UgYXRsZWFzdCBcIiArIGRpZmZlcmVuY2UgKyBcIiBLZyB0byBiZSBpbiBnb29kIGhlYWx0aCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNTU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDU3ICYmIHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDUwKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IDU3IC0gdGhpcy51c2VyRGF0YS53ZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJZb3UgTmVlZCBUbyBJbXByb3ZlIFlvdXIgRml0bmVzcyEhISBZb3UgbXVzdCBHYWluIGF0bGVhc3QgXCIgKyBkaWZmZXJlbmNlICsgXCIgS2cgdG8gYmUgaW4gZ29vZCBoZWFsdGghIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDYwO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVzZXJEYXRhLndlaWdodCA8IDUwKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IDU3IC0gdGhpcy51c2VyRGF0YS53ZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJZb3VyIEZpdG5lc3MgaXMgaW4gRGFuZ2VyISEhIFlvdSBhcmUgdmVyeSBsaWdodC4gWW91IG11c3QgR2FpbiBhdGxlYXN0IFwiICsgZGlmZmVyZW5jZSArIFwiIEtnIHRvIGJlIGluIGdvb2QgaGVhbHRoISFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAzNTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPiA4NSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnVzZXJEYXRhLndlaWdodCAtIDY1O1xuICAgICAgICAgICAgICAgIHRoaXMuaGVscFN0cmluZyA9IFwiWW91ciBGaXRuZXNzIGlzIGluIERhbmdlciEhISBZb3UgYXJlIHZlcnkgaGVhdnkuIFlvdSBtdXN0IExvc2UgYXRsZWFzdCBcIiArIGRpZmZlcmVuY2UgKyBcIiBLZyB0byBiZSBpbiBnb29kIGhlYWx0aCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMjU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDY1ICYmIHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDU3KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdSBhcmUgaW4gR29vZCBIZWFsdGghISBLZWVwIFlvdXIgRml0bmVzcyBMaWtlIFRoaXMgRm9yZXZlciEhIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDEwMCAtICg2NSAtIHRoaXMudXNlckRhdGEud2VpZ2h0KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS5oZWlnaHQgPiA1LjYgJiYgdGhpcy51c2VyRGF0YS5oZWlnaHQgPD0gNS4xMSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPiA3NSAmJiB0aGlzLnVzZXJEYXRhLndlaWdodCA8PSA5MCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnVzZXJEYXRhLndlaWdodCAtIDc1O1xuICAgICAgICAgICAgICAgIHRoaXMuaGVscFN0cmluZyA9IFwiWW91IE5lZWQgVG8gSW1wcm92ZSBZb3VyIEZpdG5lc3MhISEgWW91IG11c3QgTG9zZSBhdGxlYXN0IFwiICsgZGlmZmVyZW5jZSArIFwiIEtnIHRvIGJlIGluIGdvb2QgaGVhbHRoISFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSA2MDtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPD0gNjUgJiYgdGhpcy51c2VyRGF0YS53ZWlnaHQgPj0gNTUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gNjUgLSB0aGlzLnVzZXJEYXRhLndlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdSBOZWVkIFRvIEltcHJvdmUgWW91ciBGaXRuZXNzISEhIFlvdSBtdXN0IEdhaW4gYXRsZWFzdCBcIiArIGRpZmZlcmVuY2UgKyBcIiBLZyB0byBiZSBpbiBnb29kIGhlYWx0aCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNTU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDwgNTUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gNjUgLSB0aGlzLnVzZXJEYXRhLndlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdXIgRml0bmVzcyBpcyBpbiBEYW5nZXIhISEgWW91IGFyZSB2ZXJ5IGxpZ2h0LiBZb3UgbXVzdCBHYWluIGF0bGVhc3QgXCIgKyBkaWZmZXJlbmNlICsgXCIgS2cgdG8gYmUgaW4gZ29vZCBoZWFsdGghIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDQwO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVzZXJEYXRhLndlaWdodCA+IDkwKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IHRoaXMudXNlckRhdGEud2VpZ2h0IC0gNjU7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJZb3VyIEZpdG5lc3MgaXMgaW4gRGFuZ2VyISEhIFlvdSBhcmUgdmVyeSBoZWF2eS4gWW91IG11c3QgTG9zZSBhdGxlYXN0IFwiICsgZGlmZmVyZW5jZSArIFwiIEtnIHRvIGJlIGluIGdvb2QgaGVhbHRoISFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDc1ICYmIHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDY1KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdSBhcmUgaW4gR29vZCBIZWFsdGghISBLZWVwIFlvdXIgRml0bmVzcyBMaWtlIFRoaXMgRm9yZXZlciEhIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDEwMCAtICg3NSAtIHRoaXMudXNlckRhdGEud2VpZ2h0KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS5oZWlnaHQgPCA1ICYmIHRoaXMudXNlckRhdGEuaGVpZ2h0ID49IDQpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0ID4gNTcgJiYgdGhpcy51c2VyRGF0YS53ZWlnaHQgPD0gNjUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy51c2VyRGF0YS53ZWlnaHQgLSA1NztcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdSBOZWVkIFRvIEltcHJvdmUgWW91ciBGaXRuZXNzISEhIFlvdSBtdXN0IExvc2UgYXRsZWFzdCBcIiArIGRpZmZlcmVuY2UgKyBcIiBLZyB0byBiZSBpbiBnb29kIGhlYWx0aCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNTU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDUwICYmIHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDQ1KSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IDUwIC0gdGhpcy51c2VyRGF0YS53ZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJZb3UgTmVlZCBUbyBJbXByb3ZlIFlvdXIgRml0bmVzcyEhISBZb3UgbXVzdCBHYWluIGF0bGVhc3QgXCIgKyBkaWZmZXJlbmNlICsgXCIgS2cgdG8gYmUgaW4gZ29vZCBoZWFsdGghIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDU1O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVzZXJEYXRhLndlaWdodCA8IDQ1KSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IDUwIC0gdGhpcy51c2VyRGF0YS53ZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJZb3VyIEZpdG5lc3MgaXMgaW4gRGFuZ2VyISEhIFlvdSBhcmUgdmVyeSBsaWdodC4gWW91IG11c3QgR2FpbiBhdGxlYXN0IFwiICsgZGlmZmVyZW5jZSArIFwiIEtnIHRvIGJlIGluIGdvb2QgaGVhbHRoISFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAzNTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPiA2NSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnVzZXJEYXRhLndlaWdodCAtIDU3O1xuICAgICAgICAgICAgICAgIHRoaXMuaGVscFN0cmluZyA9IFwiWW91ciBGaXRuZXNzIGlzIGluIERhbmdlciEhISBZb3UgYXJlIHZlcnkgaGVhdnkuIFlvdSBtdXN0IExvc2UgYXRsZWFzdCBcIiArIGRpZmZlcmVuY2UgKyBcIiBLZyB0byBiZSBpbiBnb29kIGhlYWx0aCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMzU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDU3ICYmIHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDUwKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdSBhcmUgaW4gR29vZCBIZWFsdGghISBLZWVwIFlvdXIgRml0bmVzcyBMaWtlIFRoaXMgRm9yZXZlciEhIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDEwMCAtICg1NyAtIHRoaXMudXNlckRhdGEud2VpZ2h0KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS5oZWlnaHQgPCA0KSB7XG5cbiAgICAgICAgICAgIHRoaXMuaGVscFN0cmluZyA9IFwiWW91IFNob3VsZCBJbmNyZWFzZSBZb3VyIEhlaWdodCBhdGxlYXN0IGhhbGYgYSBmb290IGFuZCB5b3VyIFdlaWdodCBzaG91bGQgYmUgaW4gNDUtNTUgS2cgcmFuZ2UhIVwiO1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDQ1ICYmIHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDU1KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSA3NTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSA1NTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS5oZWlnaHQgPj0gNiAmJiB0aGlzLnVzZXJEYXRhLmhlaWdodCA8IDYuNSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPCA2NSAmJiB0aGlzLnVzZXJEYXRhLndlaWdodCA+PSA1OCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSA2NSAtIHRoaXMudXNlckRhdGEud2VpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuaGVscFN0cmluZyA9IFwiWW91ciBGaXRuZXNzIGlzIGEgYml0IGluIERhbmdlciEhIS4gWW91IHNob3VsZCBHYWluIGF0bGVhc3QgXCIgKyBkaWZmZXJlbmNlICsgXCIgS2cgc29tZSBtb3JlIFdlaWdodCB0byBiZSBpbiBnb29kIGhlYWx0aCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNTU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0ID49IDY1ICYmIHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDgwKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIllvdXIgRml0bmVzcyBpcyBHb29kIHRvIEdvISEhLiBLZWVwIGl0IFVwISFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAxMDAgLSAoODAgLSB0aGlzLnVzZXJEYXRhLndlaWdodCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDw9IDEwMCAmJiB0aGlzLnVzZXJEYXRhLndlaWdodCA+IDgwKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IHRoaXMudXNlckRhdGEud2VpZ2h0IC0gODA7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJZb3VyIEZpdG5lc3MgaXMgYSBiaXQgaW4gRGFuZ2VyISEhLiBZb3Ugc2hvdWxkIExvc2UgYXRsZWFzdCBcIiArIGRpZmZlcmVuY2UgKyBcIiBLZyBzb21lIG1vcmUgV2VpZ2h0IHRvIGJlIGluIGdvb2QgaGVhbHRoISFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSA1NTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPiAxMDApIHtcblxuICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy51c2VyRGF0YS53ZWlnaHQgLSA4MDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIkl0IGlzIERpc2FzdHJvdXMhISEuIFlvdSBzaG91bGQgTG9zZSBhdGxlYXN0IFwiICsgZGlmZmVyZW5jZSArIFwiIEtnIHNvbWUgbW9yZSBXZWlnaHQgdG8gYmUgU3RhYmxlZCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNDU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDwgNTgpIHtcblxuICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gNjUgLSB0aGlzLnVzZXJEYXRhLndlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIkl0IGlzIERpc2FzdHJvdXMhISEuIFlvdSBzaG91bGQgR2FpbiBhdGxlYXN0IFwiICsgZGlmZmVyZW5jZSArIFwiIEtnIHNvbWUgbW9yZSBXZWlnaHQgdG8gYmUgU3RhYmxlZCEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMzU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEuaGVpZ2h0IDwgNCB8fCB0aGlzLnVzZXJEYXRhLmhlaWdodCA+IDYuNSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWlnaHQgPCA0KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBTdHJpbmcgPSBcIkFjY29yZGluZyB0byB5b3VyIEhlaWdodCwgeW91ciB3ZWlnaHQgc2hvdWxkIGxpZSB3aXRoaW4gMzUtNDUgS2cuIEJ1dCB5b3UgYWxzbyBzaG91bGQgaW5jcmVhc2UgeW91ciBoZWlnaHQgbWFuZGF0b3JpbHlcIjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPiAzNCAmJiB0aGlzLnVzZXJEYXRhLndlaWdodCA8IDQ2KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNjU7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS53ZWlnaHQgPiA1NSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDI1O1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDU1O1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVzZXJEYXRhLmhlaWdodCA+IDYuNSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwU3RyaW5nID0gXCJBY2NvcmRpbmcgdG8geW91ciBIZWlnaHQsIHlvdXIgd2VpZ2h0IHNob3VsZCBsaWUgd2l0aGluIDc1LTkwIEtnLiBJZiBJdCBpcyBub3QsIHlvdSBtdXN0IGdhaW4vbG9zZSB3ZWlnaHQgcmVzcGVjdGl2ZWx5XCI7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckRhdGEud2VpZ2h0IDwgOTEgJiYgdGhpcy51c2VyRGF0YS53ZWlnaHQgPiA3NCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDEwMCAtICg5MCAtIHRoaXMudXNlckRhdGEud2VpZ2h0KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVzZXJEYXRhLndlaWdodCA8IDYwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMzU7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gNjU7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1ZhbHVlIDwgNTApIHtcblxuICAgICAgICAgICAgdGhpcy5iYXJDb2xvciA9IFwiI0ZGMDAwMFwiO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9ncmVzc1ZhbHVlID4gODApIHtcblxuICAgICAgICAgICAgdGhpcy5iYXJDb2xvciA9IFwiIzhDNDg5RlwiO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9ncmVzc1ZhbHVlID49IDUwICYmIHRoaXMucHJvZ3Jlc3NWYWx1ZSA8IDYwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYmFyQ29sb3IgPSBcIiNGRkZGMDBcIjtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvZ3Jlc3NWYWx1ZSA+PSA2MCAmJiB0aGlzLnByb2dyZXNzVmFsdWUgPCA3MCkge1xuXG4gICAgICAgICAgICB0aGlzLmJhckNvbG9yID0gXCIjMDA4MDAwXCI7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb2dyZXNzVmFsdWUgPj0gNzAgJiYgdGhpcy5wcm9ncmVzc1ZhbHVlIDw9IDgwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYmFyQ29sb3IgPSBcIiMwMEZGRkZcIjtcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50YWdlID0gU3RyaW5nKHRoaXMucHJvZ3Jlc3NWYWx1ZSkgKyBcIiVcIjtcblxuICAgIH1cblxuICAgIHNldERhdGEodGVtcDogVXNlckRhdGEpIHtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5hZ2UgPSB0ZW1wLmFnZTtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5nZW5kZXIgPSB0ZW1wLmdlbmRlcjtcbiAgICAgICAgdGhpcy51c2VyRGF0YS53ZWlnaHQgPSB0ZW1wLndlaWdodDtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5oZWlnaHQgPSB0ZW1wLmhlaWdodDtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5hcm1TaXplID0gdGVtcC5hcm1TaXplO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnRoaWdoU2l6ZSA9IHRlbXAudGhpZ2hTaXplO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLmNoZXN0U2l6ZSA9IHRlbXAuY2hlc3RTaXplO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLmltYWdlID0gdGVtcC5pbWFnZTtcbiAgICB9XG5cbiAgICB0b2dnbGVJbWFnZSgpIHtcbiAgICAgICAgdGhpcy5pbWFnZUlzT24gPSAhdGhpcy5pbWFnZUlzT247XG4gICAgfVxuXG4gICAgdG9nZ2xlSWNvbnMoKSB7XG4gICAgICAgIHRoaXMuaGlkZUljb25zID0gIXRoaXMuaGlkZUljb25zO1xuICAgIH1cblxuICAgIHVwbG9hZEltYWdlKCkge1xuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZSgpO1xuICAgICAgICBsZXQgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb250ZXh0LmF1dGhvcml6ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xuICAgICAgICB9KS50aGVuKChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnVzZXJEYXRhLmltYWdlID0gc2VsZWN0Ll9hbmRyb2lkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ291bGRuJ3QgdXBsb2FkIEltYWdlXCIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHRha2VJbWFnZSgpIHtcblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMudG9nZ2xlSW1hZ2UoKTtcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xuICAgICAgICB0YWtlUGljdHVyZSh7IHdpZHRoOiA0NTAsIGhlaWdodDogNDUwLCBjYW1lcmFGYWNpbmc6IFwiZnJvbnRcIiB9KS50aGVuKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBuZXcgaW1hZ2VTb3VyY2VNb2R1bGUuSW1hZ2VTb3VyY2UoKTtcbiAgICAgICAgICAgIHNvdXJjZS5mcm9tQXNzZXQoaW1nKS50aGVuKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcIlNhdmVJbWFnZVwiICsgbWlsbGlzZWNvbmRzICsgXCIuanBlZ1wiKTtcbiAgICAgICAgICAgICAgICB2YXIgc2F2ZWQgPSBzb3VyY2Uuc2F2ZVRvRmlsZShwYXRoLCBcImpwZWdcIik7XG4gICAgICAgICAgICAgICAgdGhhdC51c2VyRGF0YS5pbWFnZSA9IHBhdGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzYXZlRGV0YWlscygpIHtcblxuICAgICAgICB0aGlzLmltYWdlSXNPbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvZ2dsZUljb25zKCk7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIlVQREFURSBBY2NvdW50cyBTRVQgYWdlPT8sIGhlaWdodD0/ICwgd2VpZ2h0PT8gLCBnZW5kZXI9PyAsIGFybVNpemU9PyAsIHRoaWdoU2l6ZT0/ICwgY2hlc3RTaXplPT8gLCBpbWFnZT0/IFdIRVJFIGlkPT8gXCIsIFt0aGlzLnVzZXJEYXRhLmFnZSwgdGhpcy51c2VyRGF0YS5oZWlnaHQsIHRoaXMudXNlckRhdGEud2VpZ2h0LCB0aGlzLnVzZXJEYXRhLmdlbmRlciwgdGhpcy51c2VyRGF0YS5hcm1TaXplLCB0aGlzLnVzZXJEYXRhLnRoaWdoU2l6ZSwgdGhpcy51c2VyRGF0YS5jaGVzdFNpemUsIHRoaXMudXNlckRhdGEuaW1hZ2UsIHRoaXMuaWRdKS50aGVuKGlkID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRGV0YWlscyBTYXZlZCBTdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydChcIlVwZGF0ZSBRdWVyeSBFcnJvclwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZml0bmVzc0NhbGN1bGF0b3IoKTtcblxuICAgIH1cblxuICAgIGNsZWFyRGV0YWlscygpIHtcblxuICAgICAgICB0aGlzLmltYWdlSXNPbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvZ2dsZUljb25zKCk7XG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YS5zdG9yYWdlKSk7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSBuZXcgVXNlckRhdGEob2JqLnVzZXJuYW1lLCBvYmouZW1haWwpO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLmltYWdlID0gXCJ+L0ltYWdlcy9ibGFuay5wbmdcIjtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIEFjY291bnRzIFNFVCBhZ2U9PywgaGVpZ2h0PT8gLCB3ZWlnaHQ9PyAsIGdlbmRlcj0/ICwgYXJtU2l6ZT0/ICwgdGhpZ2hTaXplPT8gLCBjaGVzdFNpemU9PyAsIGltYWdlPT8gV0hFUkUgaWQ9PyBcIiwgW3RoaXMudXNlckRhdGEuYWdlLCB0aGlzLnVzZXJEYXRhLmhlaWdodCwgdGhpcy51c2VyRGF0YS53ZWlnaHQsIHRoaXMudXNlckRhdGEuZ2VuZGVyLCB0aGlzLnVzZXJEYXRhLmFybVNpemUsIHRoaXMudXNlckRhdGEudGhpZ2hTaXplLCB0aGlzLnVzZXJEYXRhLmNoZXN0U2l6ZSwgdGhpcy51c2VyRGF0YS5pbWFnZSwgdGhpcy5pZF0pLnRoZW4oaWQgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJEZXRhaWxzIFNhdmVkIFN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2xlYXIgUXVlcnkgRXJyb3JcIik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLmZpdG5lc3NDYWxjdWxhdG9yKCk7XG5cbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2ZpcnN0cGFnZVwiXSk7XG5cbiAgICB9XG5cbiAgICBkb25lKCkge1xuXG4gICAgICAgIHRoaXMudG9nZ2xlSWNvbnMoKTtcblxuICAgIH1cblxuICAgIHJlbW92ZUltYWdlKCkge1xuXG4gICAgICAgIHRoaXMudXNlckRhdGEuaW1hZ2UgPSBcIn4vSW1hZ2VzL2JsYW5rLnBuZ1wiO1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJVUERBVEUgQWNjb3VudHMgU0VUIGltYWdlPT8gV0hFUkUgaWQ9PyBcIiwgW3RoaXMudXNlckRhdGEuaW1hZ2UsIHRoaXMuaWRdKS50aGVuKGlkID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRGV0YWlscyBTYXZlZCBTdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydChcIlVwZGF0ZSBRdWVyeSBFcnJvclwiKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvQ2hhbmdlQ3JlZGVudGlhbHNQYWdlKCkge1xuXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jaGFuZ2VjcmVkZW50aWFsc3BhZ2VcIl0pO1xuXG4gICAgfVxuXG59XG4iXX0=