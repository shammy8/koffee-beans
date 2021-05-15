import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TuiRootModule } from '@taiga-ui/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { SpendingsModule } from './spendings/spendings.module';
import { TuiSharedModule } from '@koffee-beans/tui';
import { UiModule } from '@koffee-beans/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TuiRootModule,
    TuiSharedModule, // TODO remove this later
    NgxPlaidLinkModule, // TODO remove this since it hasn't been updated to use link tokens
    UiModule,
    SpendingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
