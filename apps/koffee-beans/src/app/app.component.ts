import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';
import { switchMap } from 'rxjs/operators';
declare let Plaid: any; // TODO is this the best way

@Component({
  selector: 'kb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  linkTokenSub!: Subscription;
  linkToken = '';
  getAccessTokenSub!: Subscription;
  // hello$ = this.http.post('plaid/create-link-token', {});

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.linkTokenSub = this.http
      .post<any>('api/plaid/create_link_token', {}) // TODO make interface
      .subscribe((res) => {
        this.linkToken = res.linkToken;
      });
    // return;
  }

  onPlaidSuccess(
    /* res: PlaidOnSuccessArgs */ publicToken: string,
    metadata: any
  ) {
    if (publicToken) {
      console.log('success', publicToken, metadata);
      this.getAccessTokenSub = this.http
        .post('api/plaid/get_access_token', { publicToken })
        .pipe(
          switchMap((res: any) =>
            this.http.post<any>('api/plaid/transactions', {
              accessToken: res.access_token,
            })
          )
        )
        .subscribe(console.log);
    }
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

  // TODO put this into it's own directive??
  click() {
    const handler = Plaid.create({
      token: this.linkToken,
      onSuccess: this.onPlaidSuccess.bind(this),
      onLoad: this.onPlaidLoad,
      onExit: this.onPlaidExit,
      onEvent: this.onPlaidEvent,
    });
    handler.open(); // TODO do we need to destory this?
  }

  ngOnDestroy() {
    this.linkTokenSub?.unsubscribe();
    this.getAccessTokenSub?.unsubscribe();
  }
}
