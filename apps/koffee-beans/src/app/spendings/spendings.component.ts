import { Component, OnInit } from '@angular/core';
import { Spending } from '@koffee-beans/api-interfaces';

@Component({
  selector: 'kb-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss'],
})
export class SpendingsComponent implements OnInit {
  // constructor() {}

  ngOnInit(): void {
    return;
  }

  submitNewSpending(spending: Spending) {
    console.log('submit new spending', spending);
  }
}
