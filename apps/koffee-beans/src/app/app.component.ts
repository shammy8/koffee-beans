import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';
import {
  CreateLinkTokenResponse,
  TokenResponse,
  TransactionsAllResponse,
} from 'plaid';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'kb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  linkTokenSub!: Subscription;
  linkToken = '';
  getTransactionsSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.linkTokenSub = this.http
      .post<CreateLinkTokenResponse>('api/plaid/create_link_token', {})
      .subscribe((res) => {
        this.linkToken = res.link_token;
      });
  }

  onPlaidSuccess(res: PlaidOnSuccessArgs) {
    console.log('success', res.token);
    this.getTransactionsSub = this.http
      .post<TokenResponse>('api/plaid/get_access_token', res)
      .pipe(
        concatMap((res) =>
          this.http.post<TransactionsAllResponse>('api/plaid/transactions', res)
        )
      )
      .subscribe(console.log);
  }

  onPlaidExit(res: PlaidOnExitArgs) {
    // console.log('exit', res);
  }

  onPlaidLoad(res: string) {
    // res just says responds with link_loaded, use it to disable the button instead?
    // console.log('load', res);
  }

  onPlaidEvent(res: PlaidOnEventArgs) {
    // console.log('event', res);
  }

  onPlaidClick(res: MouseEvent) {
    // console.log('click', res);
  }

  ngOnDestroy() {
    this.linkTokenSub?.unsubscribe();
    this.getTransactionsSub?.unsubscribe();
  }
}
