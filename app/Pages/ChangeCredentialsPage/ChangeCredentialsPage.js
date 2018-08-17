"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var provider_1 = require("../../provider");
var Sqlite = require("nativescript-sqlite");
var ChangeCredentialsPageComponent = /** @class */ (function () {
    function ChangeCredentialsPageComponent(router, data) {
        this.router = router;
        this.data = data;
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
    ChangeCredentialsPageComponent.prototype.db = function () {
        var _this = this;
        (new Sqlite("Fitness.db")).then(function (db) {
            _this.database = db;
            _this.readQuery();
        }, function (error) {
            alert("DB ERROR");
        });
    };
    ChangeCredentialsPageComponent.prototype.readQuery = function () {
        var _this = this;
        this.database.all("SELECT * FROM Accounts").then(function (rows) {
            for (var row in rows) {
                if (_this.oldEmail === rows[row][1]) {
                    _this.oldPassword = rows[row][3];
                    break;
                }
            }
        }, function (error) {
            alert("Select Query Error");
        });
    };
    ChangeCredentialsPageComponent.prototype.logout = function () {
        this.router.navigate(["/firstpage"]);
    };
    ChangeCredentialsPageComponent.prototype.toggleUsername = function () {
        this.usernameButton = !this.usernameButton;
        this.combinedView2 = !this.combinedView2;
        this.combinedView3 = !this.combinedView3;
    };
    ChangeCredentialsPageComponent.prototype.toggleEmail = function () {
        this.emailButton = !this.emailButton;
        this.combinedView1 = !this.combinedView1;
        this.combinedView3 = !this.combinedView3;
    };
    ChangeCredentialsPageComponent.prototype.togglePassword = function () {
        this.passwordButton = !this.passwordButton;
        this.combinedView1 = !this.combinedView1;
        this.combinedView2 = !this.combinedView2;
    };
    ChangeCredentialsPageComponent.prototype.updateUsername = function () {
        var _this = this;
        this.database.execSQL("UPDATE Accounts SET username=? WHERE email=?", [this.newUsername, this.oldEmail]).then(function (id) {
            alert("Username Updated SuccessFully!!");
            _this.data.storage = {
                "username": _this.newUsername
            };
            _this.router.navigate(["/firstpage"]);
        }, function (error) {
            alert("Username Updating Error!!");
        });
        this.toggleUsername();
    };
    ChangeCredentialsPageComponent.prototype.updateEmail = function () {
        var _this = this;
        this.database.execSQL("UPDATE Accounts SET email=? WHERE email=?", [this.newEmail, this.oldEmail]).then(function (id) {
            alert("Email Updated SuccessFully!!");
            _this.data.storage = {
                "email": _this.newEmail
            };
            _this.router.navigate(["/firstpage"]);
        }, function (error) {
            alert("Email Updating Error!!");
        });
        this.toggleEmail();
    };
    ChangeCredentialsPageComponent.prototype.updatePassword = function () {
        var _this = this;
        this.database.execSQL("UPDATE Accounts SET password=? WHERE email=?", [this.newPassword, this.oldEmail]).then(function (id) {
            alert("Password Updated SuccessFully!!");
            _this.router.navigate(["/firstpage"]);
        }, function (error) {
            alert("Password Updating Error!!");
        });
        this.togglePassword();
    };
    ChangeCredentialsPageComponent = __decorate([
        core_1.Component({
            selector: "changecredentialspage",
            templateUrl: "./Pages/ChangeCredentialsPage/ChangeCredentialsPage.html",
            styleUrls: ["./Pages/ChangeCredentialsPage/ChangeCredentialsPage.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, provider_1.Data])
    ], ChangeCredentialsPageComponent);
    return ChangeCredentialsPageComponent;
}());
exports.ChangeCredentialsPageComponent = ChangeCredentialsPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbmdlQ3JlZGVudGlhbHNQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hhbmdlQ3JlZGVudGlhbHNQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDBDQUF5QztBQUN6QywyQ0FBc0M7QUFDdEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFTNUM7SUFnQkksd0NBQTJCLE1BQWMsRUFBVSxJQUFVO1FBQWxDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRXpELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFZCxDQUFDO0lBRUQsMkNB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OEJBQThCLENBbUkxQztJQUFELHFDQUFDO0NBQUEsQUFuSUQsSUFtSUM7QUFuSVksd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3Byb3ZpZGVyXCI7XHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImNoYW5nZWNyZWRlbnRpYWxzcGFnZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9QYWdlcy9DaGFuZ2VDcmVkZW50aWFsc1BhZ2UvQ2hhbmdlQ3JlZGVudGlhbHNQYWdlLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9QYWdlcy9DaGFuZ2VDcmVkZW50aWFsc1BhZ2UvQ2hhbmdlQ3JlZGVudGlhbHNQYWdlLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZUNyZWRlbnRpYWxzUGFnZUNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xyXG4gICAgb2xkVXNlcm5hbWU6IHN0cmluZztcclxuICAgIG5ld1VzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICBvbGRFbWFpbDogc3RyaW5nO1xyXG4gICAgbmV3RW1haWw6IHN0cmluZztcclxuICAgIG9sZFBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBuZXdQYXNzd29yZDogc3RyaW5nO1xyXG4gICAgdXNlcm5hbWVCdXR0b246IEJvb2xlYW47XHJcbiAgICBlbWFpbEJ1dHRvbjogQm9vbGVhbjtcclxuICAgIHBhc3N3b3JkQnV0dG9uOiBCb29sZWFuO1xyXG4gICAgY29tYmluZWRWaWV3MTogYm9vbGVhbjtcclxuICAgIGNvbWJpbmVkVmlldzI6IGJvb2xlYW47XHJcbiAgICBjb21iaW5lZFZpZXczOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcclxuXHJcbiAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLnN0b3JhZ2UpKTtcclxuICAgICAgICB0aGlzLm9sZFVzZXJuYW1lID0gb2JqLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMubmV3VXNlcm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMub2xkRW1haWwgPSBvYmouZW1haWw7XHJcbiAgICAgICAgdGhpcy5uZXdFbWFpbCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5vbGRQYXNzd29yZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZUJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZW1haWxCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkQnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21iaW5lZFZpZXcxID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbWJpbmVkVmlldzIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tYmluZWRWaWV3MyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kYigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkYigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJGaXRuZXNzLmRiXCIpKS50aGVuKGRiID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVhZFF1ZXJ5KCk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcIkRCIEVSUk9SXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZWFkUXVlcnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBBY2NvdW50c1wiKS50aGVuKHJvd3MgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgaW4gcm93cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2xkRW1haWwgPT09IHJvd3Nbcm93XVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2xkUGFzc3dvcmQgPSByb3dzW3Jvd11bM107XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU2VsZWN0IFF1ZXJ5IEVycm9yXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2ZpcnN0cGFnZVwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVXNlcm5hbWUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMudXNlcm5hbWVCdXR0b24gPSAhdGhpcy51c2VybmFtZUJ1dHRvbjtcclxuICAgICAgICB0aGlzLmNvbWJpbmVkVmlldzIgPSAhdGhpcy5jb21iaW5lZFZpZXcyO1xyXG4gICAgICAgIHRoaXMuY29tYmluZWRWaWV3MyA9ICF0aGlzLmNvbWJpbmVkVmlldzM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUVtYWlsKCkge1xyXG5cclxuICAgICAgICB0aGlzLmVtYWlsQnV0dG9uID0gIXRoaXMuZW1haWxCdXR0b247XHJcbiAgICAgICAgdGhpcy5jb21iaW5lZFZpZXcxID0gIXRoaXMuY29tYmluZWRWaWV3MTtcclxuICAgICAgICB0aGlzLmNvbWJpbmVkVmlldzMgPSAhdGhpcy5jb21iaW5lZFZpZXczO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVQYXNzd29yZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wYXNzd29yZEJ1dHRvbiA9ICF0aGlzLnBhc3N3b3JkQnV0dG9uO1xyXG4gICAgICAgIHRoaXMuY29tYmluZWRWaWV3MSA9ICF0aGlzLmNvbWJpbmVkVmlldzE7XHJcbiAgICAgICAgdGhpcy5jb21iaW5lZFZpZXcyID0gIXRoaXMuY29tYmluZWRWaWV3MjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVVzZXJuYW1lKCkge1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJVUERBVEUgQWNjb3VudHMgU0VUIHVzZXJuYW1lPT8gV0hFUkUgZW1haWw9P1wiLCBbdGhpcy5uZXdVc2VybmFtZSwgdGhpcy5vbGRFbWFpbF0pLnRoZW4oaWQgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lIFVwZGF0ZWQgU3VjY2Vzc0Z1bGx5ISFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB0aGlzLm5ld1VzZXJuYW1lIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZmlyc3RwYWdlXCJdKTtcclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVXNlcm5hbWUgVXBkYXRpbmcgRXJyb3IhIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRvZ2dsZVVzZXJuYW1lKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVFbWFpbCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIEFjY291bnRzIFNFVCBlbWFpbD0/IFdIRVJFIGVtYWlsPT9cIiwgW3RoaXMubmV3RW1haWwsIHRoaXMub2xkRW1haWxdKS50aGVuKGlkID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFbWFpbCBVcGRhdGVkIFN1Y2Nlc3NGdWxseSEhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcclxuICAgICAgICAgICAgICAgIFwiZW1haWxcIjogdGhpcy5uZXdFbWFpbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZmlyc3RwYWdlXCJdKTtcclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRW1haWwgVXBkYXRpbmcgRXJyb3IhIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUVtYWlsKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVQYXNzd29yZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIEFjY291bnRzIFNFVCBwYXNzd29yZD0/IFdIRVJFIGVtYWlsPT9cIiwgW3RoaXMubmV3UGFzc3dvcmQsIHRoaXMub2xkRW1haWxdKS50aGVuKGlkID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQYXNzd29yZCBVcGRhdGVkIFN1Y2Nlc3NGdWxseSEhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZmlyc3RwYWdlXCJdKTtcclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUGFzc3dvcmQgVXBkYXRpbmcgRXJyb3IhIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRvZ2dsZVBhc3N3b3JkKCk7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==