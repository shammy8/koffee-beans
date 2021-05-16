import { Component, OnInit } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'kb-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss'],
})
export class NetWorthComponent implements OnInit {
  readonly value = [
    [new TuiDay(2020, 10, 1), 130],
    [new TuiDay(2020, 11, 1), 180],
    [new TuiDay(2021, 0, 1), 180],
    [new TuiDay(2021, 1, 1), 200],
    [new TuiDay(2021, 2, 1), 250],
    [new TuiDay(2021, 3, 1), 160],
    [new TuiDay(2021, 4, 1), 250],
    // [TuiDay.currentLocal(), 150],
  ] as readonly [TuiDay, number][];

  readonly barChartValue = [
    [20, 10, 30],
    [34, 54, 10],
    [3, 2, 70],
    [13, 28, 70],
  ];

  readonly labels = [
    'Nov 2020',
    'Dec 2020',
    'Jan 2021',
    'Feb 2021',
    'Mar 2021',
    'Apr 2021',
    'May 2021',
  ];

  barChartHint = ({ $implicit }: any) => {
    return `${this.barChartValue[0][$implicit]}, ${this.barChartValue[1][$implicit]}, ${this.barChartValue[2][$implicit]}, ${this.barChartValue[3][$implicit]}`;
  };

  ngOnInit(): void {
    return;
  }
}
