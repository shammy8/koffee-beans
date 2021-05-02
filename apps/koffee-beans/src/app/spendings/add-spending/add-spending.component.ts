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
  categories = [
    { id: 'eatOut', label: 'Eat Out' },
    { id: 'groceries', label: 'Groceries' },
  ];

  form = this.fb.group({
    date: [TuiDay.currentLocal(), [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(30)]],
    category: ['', [Validators.required]],
    cost: [0, [Validators.required, Validators.min(0)]],
    notes: ['', Validators.maxLength(100)],
  });

  @Output() submitNewSpending = new EventEmitter<Spending>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  addSpending() {
    if (this.form.valid) {
      this.submitNewSpending.emit(this.form.value);
    }
  }
}
