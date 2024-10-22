import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  @Input() transactions: any[] = [];
  @Output() onRemoveTransaction = new EventEmitter<any>();

  remove(transaction: any) {
    this.onRemoveTransaction.emit(transaction);
  }
}
