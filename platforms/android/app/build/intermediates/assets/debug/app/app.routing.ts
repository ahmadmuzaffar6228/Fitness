import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { FirstPageComponent } from "~/Pages/FirstPage/FirstPage";
import { SecondPageComponent } from "~/Pages/SecondPage/SecondPage";
import { ChangeCredentialsPageComponent } from "~/Pages/ChangeCredentialsPage/ChangeCredentialsPage";

const routes: Routes = [
    { path: "", component: FirstPageComponent },
    { path: "secondpage", component: SecondPageComponent },
    { path: "firstpage", component: FirstPageComponent },
    { path: "changecredentialspage", component: ChangeCredentialsPageComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }