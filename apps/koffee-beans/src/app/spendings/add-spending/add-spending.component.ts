import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Spending } from '@koffee-beans/api-interfaces';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'kb-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.scss'],
})
export class AddSpendingComponent implements OnInit {
  form = this.fb.group({
    date: [TuiDay.currentLocal(), [Validators.required]],
    cost: [0, [Validators.required]],
    notes: ['', Validators.maxLength(100)],
  });

  @Output() submitNewSpending = new EventEmitter<Spending>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  addSpending() {
    this.submitNewSpending.emit(this.form.value);
  }
}
