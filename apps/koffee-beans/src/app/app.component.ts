import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';
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
      .post<any>('api/plaid/create_link_token', {}) // TODO make interface
      .subscribe((res) => {
        this.linkToken = res.linkToken;
      });
  }

  onPlaidSuccess(res: PlaidOnSuccessArgs) {
    console.log('success', res.token);
    this.getTransactionsSub = this.http
      .post('api/plaid/get_access_token', { publicToken: res.token })
      .pipe(
        concatMap((res: any) =>
          this.http.post<any>('api/plaid/transactions', {
            accessToken: res.access_token,
          })
        )
      )
      .subscribe(console.log);
  }

  onPlaidExit(res: PlaidOnExitArgs) {
    console.log('exit', res);
  }

  onPlaidLoad(res: string) {
    // res just says responds with link_loaded, use it to disable the button instead?
    console.log('load', res);
  }

  onPlaidEvent(res: PlaidOnEventArgs) {
    console.log('event', res);
  }

  onPlaidClick(res: MouseEvent) {
    console.log('click', res);
  }

  ngOnDestroy() {
    this.linkTokenSub?.unsubscribe();
    this.getTransactionsSub?.unsubscribe();
  }
}
