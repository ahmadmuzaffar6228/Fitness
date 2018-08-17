"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var FirstPage_1 = require("~/Pages/FirstPage/FirstPage");
var SecondPage_1 = require("~/Pages/SecondPage/SecondPage");
var ChangeCredentialsPage_1 = require("~/Pages/ChangeCredentialsPage/ChangeCredentialsPage");
var routes = [
    { path: "", component: FirstPage_1.FirstPageComponent },
    { path: "secondpage", component: SecondPage_1.SecondPageComponent },
    { path: "firstpage", component: FirstPage_1.FirstPageComponent },
    { path: "changecredentialspage", component: ChangeCredentialsPage_1.ChangeCredentialsPageComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFFdkUseURBQWlFO0FBQ2pFLDREQUFvRTtBQUNwRSw2RkFBcUc7QUFFckcsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw4QkFBa0IsRUFBRTtJQUMzQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGdDQUFtQixFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsOEJBQWtCLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLHNEQUE4QixFQUFFO0NBQy9FLENBQUM7QUFNRjtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEZpcnN0UGFnZUNvbXBvbmVudCB9IGZyb20gXCJ+L1BhZ2VzL0ZpcnN0UGFnZS9GaXJzdFBhZ2VcIjtcbmltcG9ydCB7IFNlY29uZFBhZ2VDb21wb25lbnQgfSBmcm9tIFwifi9QYWdlcy9TZWNvbmRQYWdlL1NlY29uZFBhZ2VcIjtcbmltcG9ydCB7IENoYW5nZUNyZWRlbnRpYWxzUGFnZUNvbXBvbmVudCB9IGZyb20gXCJ+L1BhZ2VzL0NoYW5nZUNyZWRlbnRpYWxzUGFnZS9DaGFuZ2VDcmVkZW50aWFsc1BhZ2VcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IEZpcnN0UGFnZUNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJzZWNvbmRwYWdlXCIsIGNvbXBvbmVudDogU2Vjb25kUGFnZUNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJmaXJzdHBhZ2VcIiwgY29tcG9uZW50OiBGaXJzdFBhZ2VDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiY2hhbmdlY3JlZGVudGlhbHNwYWdlXCIsIGNvbXBvbmVudDogQ2hhbmdlQ3JlZGVudGlhbHNQYWdlQ29tcG9uZW50IH0sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==