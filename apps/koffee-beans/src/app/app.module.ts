import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TuiRootModule, TuiButtonModule } from '@taiga-ui/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpendingsModule } from './spendings/spendings.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TuiRootModule,
    TuiButtonModule,
    SpendingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
