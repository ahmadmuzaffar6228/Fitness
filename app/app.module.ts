import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { FirstPageComponent } from "~/Pages/FirstPage/FirstPage";
import { SecondPageComponent } from "~/Pages/SecondPage/SecondPage";
import { ChangeCredentialsPageComponent } from "~/Pages/ChangeCredentialsPage/ChangeCredentialsPage";
import { Data } from "./provider";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        FirstPageComponent,
        SecondPageComponent,
        ChangeCredentialsPageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [Data]
})

export class AppModule { }
