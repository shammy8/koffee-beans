import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Spending } from '@koffee-beans/api-interfaces';

@Component({
  selector: 'kb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Spending[]>('/api/spendings');
  constructor(private http: HttpClient) {}
}
