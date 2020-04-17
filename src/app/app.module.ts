import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MyNgIf } from "./my-if.directive";
import { ListComponent } from "./language-service-breaks/list.component";
import { ListBoxComponent } from "./language-service-breaks/list-box.component";

@NgModule({
  declarations: [AppComponent, MyNgIf, ListComponent, ListBoxComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
