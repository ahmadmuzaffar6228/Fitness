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
            db.execSQL("CREATE TABLE IF NOT EXISTS loginCredentials (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL)").then(function (id) {
                _this.database = db;
                _this.readQuery();
            }, function (error) {
                alert("DB ERROR");
            });
        }, function (error) {
            alert("DB ERROR");
        });
    };
    ChangeCredentialsPageComponent.prototype.readQuery = function () {
        var _this = this;
        this.database.all("SELECT * FROM loginCredentials").then(function (rows) {
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
        this.database.execSQL("UPDATE loginCredentials SET username=? WHERE email=?", [this.newUsername, this.oldEmail]).then(function (id) {
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
        this.database.execSQL("UPDATE loginCredentials SET email=? WHERE email=?", [this.newEmail, this.oldEmail]).then(function (id) {
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
        this.database.execSQL("UPDATE loginCredentials SET password=? WHERE email=?", [this.newPassword, this.oldEmail]).then(function (id) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbmdlQ3JlZGVudGlhbHNQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hhbmdlQ3JlZGVudGlhbHNQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDBDQUF5QztBQUN6QywyQ0FBc0M7QUFDdEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFTNUM7SUFnQkksd0NBQTJCLE1BQWMsRUFBVSxJQUFVO1FBQWxDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRXpELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFZCxDQUFDO0lBRUQsMkNB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QUE4QjtRQU4xQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxXQUFXLEVBQUUsMERBQTBEO1lBQ3ZFLFNBQVMsRUFBRSxDQUFDLHlEQUF5RCxDQUFDO1NBQ3pFLENBQUM7eUNBa0JxQyxlQUFNLEVBQWdCLGVBQUk7T0FoQnBELDhCQUE4QixDQXVJMUM7SUFBRCxxQ0FBQztDQUFBLEFBdklELElBdUlDO0FBdklZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9wcm92aWRlclwiO1xyXG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJjaGFuZ2VjcmVkZW50aWFsc3BhZ2VcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vUGFnZXMvQ2hhbmdlQ3JlZGVudGlhbHNQYWdlL0NoYW5nZUNyZWRlbnRpYWxzUGFnZS5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vUGFnZXMvQ2hhbmdlQ3JlZGVudGlhbHNQYWdlL0NoYW5nZUNyZWRlbnRpYWxzUGFnZS5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VDcmVkZW50aWFsc1BhZ2VDb21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcclxuICAgIG9sZFVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICBuZXdVc2VybmFtZTogc3RyaW5nO1xyXG4gICAgb2xkRW1haWw6IHN0cmluZztcclxuICAgIG5ld0VtYWlsOiBzdHJpbmc7XHJcbiAgICBvbGRQYXNzd29yZDogc3RyaW5nO1xyXG4gICAgbmV3UGFzc3dvcmQ6IHN0cmluZztcclxuICAgIHVzZXJuYW1lQnV0dG9uOiBCb29sZWFuO1xyXG4gICAgZW1haWxCdXR0b246IEJvb2xlYW47XHJcbiAgICBwYXNzd29yZEJ1dHRvbjogQm9vbGVhbjtcclxuICAgIGNvbWJpbmVkVmlldzE6IGJvb2xlYW47XHJcbiAgICBjb21iaW5lZFZpZXcyOiBib29sZWFuO1xyXG4gICAgY29tYmluZWRWaWV3MzogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XHJcblxyXG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YS5zdG9yYWdlKSk7XHJcbiAgICAgICAgdGhpcy5vbGRVc2VybmFtZSA9IG9iai51c2VybmFtZTtcclxuICAgICAgICB0aGlzLm5ld1VzZXJuYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLm9sZEVtYWlsID0gb2JqLmVtYWlsO1xyXG4gICAgICAgIHRoaXMubmV3RW1haWwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMub2xkUGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWVCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVtYWlsQnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZEJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29tYmluZWRWaWV3MSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb21iaW5lZFZpZXcyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbWJpbmVkVmlldzMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGIoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGIoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIChuZXcgU3FsaXRlKFwiRml0bmVzcy5kYlwiKSkudGhlbihkYiA9PiB7XHJcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBsb2dpbkNyZWRlbnRpYWxzIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsIGVtYWlsIFRFWFQgTk9UIE5VTEwsIHVzZXJuYW1lIFRFWFQgTk9UIE5VTEwsIHBhc3N3b3JkIFRFWFQgTk9UIE5VTEwpXCIpLnRoZW4oaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkUXVlcnkoKTtcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJEQiBFUlJPUlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcIkRCIEVSUk9SXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZWFkUXVlcnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBsb2dpbkNyZWRlbnRpYWxzXCIpLnRoZW4ocm93cyA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyBpbiByb3dzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbGRFbWFpbCA9PT0gcm93c1tyb3ddWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGRQYXNzd29yZCA9IHJvd3Nbcm93XVszXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTZWxlY3QgUXVlcnkgRXJyb3JcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZmlyc3RwYWdlXCJdKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVVc2VybmFtZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy51c2VybmFtZUJ1dHRvbiA9ICF0aGlzLnVzZXJuYW1lQnV0dG9uO1xyXG4gICAgICAgIHRoaXMuY29tYmluZWRWaWV3MiA9ICF0aGlzLmNvbWJpbmVkVmlldzI7XHJcbiAgICAgICAgdGhpcy5jb21iaW5lZFZpZXczID0gIXRoaXMuY29tYmluZWRWaWV3MztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRW1haWwoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZW1haWxCdXR0b24gPSAhdGhpcy5lbWFpbEJ1dHRvbjtcclxuICAgICAgICB0aGlzLmNvbWJpbmVkVmlldzEgPSAhdGhpcy5jb21iaW5lZFZpZXcxO1xyXG4gICAgICAgIHRoaXMuY29tYmluZWRWaWV3MyA9ICF0aGlzLmNvbWJpbmVkVmlldzM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBhc3N3b3JkKCkge1xyXG5cclxuICAgICAgICB0aGlzLnBhc3N3b3JkQnV0dG9uID0gIXRoaXMucGFzc3dvcmRCdXR0b247XHJcbiAgICAgICAgdGhpcy5jb21iaW5lZFZpZXcxID0gIXRoaXMuY29tYmluZWRWaWV3MTtcclxuICAgICAgICB0aGlzLmNvbWJpbmVkVmlldzIgPSAhdGhpcy5jb21iaW5lZFZpZXcyO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIlVQREFURSBsb2dpbkNyZWRlbnRpYWxzIFNFVCB1c2VybmFtZT0/IFdIRVJFIGVtYWlsPT9cIiwgW3RoaXMubmV3VXNlcm5hbWUsIHRoaXMub2xkRW1haWxdKS50aGVuKGlkID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBVcGRhdGVkIFN1Y2Nlc3NGdWxseSEhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcclxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogdGhpcy5uZXdVc2VybmFtZSBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2ZpcnN0cGFnZVwiXSk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lIFVwZGF0aW5nIEVycm9yISFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVVc2VybmFtZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlRW1haWwoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIlVQREFURSBsb2dpbkNyZWRlbnRpYWxzIFNFVCBlbWFpbD0/IFdIRVJFIGVtYWlsPT9cIiwgW3RoaXMubmV3RW1haWwsIHRoaXMub2xkRW1haWxdKS50aGVuKGlkID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFbWFpbCBVcGRhdGVkIFN1Y2Nlc3NGdWxseSEhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcclxuICAgICAgICAgICAgICAgIFwiZW1haWxcIjogdGhpcy5uZXdFbWFpbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZmlyc3RwYWdlXCJdKTtcclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRW1haWwgVXBkYXRpbmcgRXJyb3IhIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUVtYWlsKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVQYXNzd29yZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIGxvZ2luQ3JlZGVudGlhbHMgU0VUIHBhc3N3b3JkPT8gV0hFUkUgZW1haWw9P1wiLCBbdGhpcy5uZXdQYXNzd29yZCwgdGhpcy5vbGRFbWFpbF0pLnRoZW4oaWQgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcIlBhc3N3b3JkIFVwZGF0ZWQgU3VjY2Vzc0Z1bGx5ISFcIik7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9maXJzdHBhZ2VcIl0pO1xyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQYXNzd29yZCBVcGRhdGluZyBFcnJvciEhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlUGFzc3dvcmQoKTtcclxuXHJcbiAgICB9XHJcblxyXG59Il19