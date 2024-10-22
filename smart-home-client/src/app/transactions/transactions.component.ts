import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionListComponent } from './transaction-list.component'; 
import { CreditCardService } from '../services/services/credit-card.service';

@Component({
  selector: 'app-transactionsscreen',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionListComponent],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  filterCardNumber = '';

  newTransaction = {
    credit_card: { card_number: '' }, 
    amount: 0,
    currency: '',
    comment: '',
    date: ''
  };
  

  isAddFormVisible = false; 
  isListVisible = false;
  transactionsLoaded = false; 

  constructor(private creditCardService: CreditCardService) {}

  ngOnInit() {
    this.loadTransactions(); 
  }

  loadTransactions() {
    this.creditCardService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = [...this.transactions]; 
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  addTransaction() {
    this.creditCardService.addTransaction(this.newTransaction).subscribe({
      next: (response) => {
        window.alert('Transaction added successfully!');
        
        this.loadTransactions();
        
        this.isAddFormVisible = false;
      },
      error: (error) => {
        console.error('Error adding transaction:', error);
      }
    });
  }

  removeTransaction(transaction: any) {
    this.creditCardService.deleteTransaction(transaction.id).subscribe({
      next: () => {
        window.alert('Transaction removed successfully!');
        
        this.loadTransactions();
      },
      error: (error) => {
        console.error('Error removing transaction:', error);
      }
    });
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(t =>
      t.credit_card && t.credit_card.number && t.credit_card.number.includes(this.filterCardNumber)
    );
  }  

  toggleTransactionList() {
    this.isListVisible = !this.isListVisible;
    
    if (this.isListVisible && !this.transactionsLoaded) {
      this.loadTransactions();
      this.transactionsLoaded = true;
    }
  }

  toggleAddForm() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  filterTransactionsCard(targetCardNumber: string) {
    const trimmedTargetCardNumber = targetCardNumber.trim(); 
    
    if (!trimmedTargetCardNumber) {
      this.filteredTransactions = [...this.transactions];
    } else {
      this.filteredTransactions = this.transactions.filter((transaction) => {
        return (
          transaction.credit_card &&
          transaction.credit_card.card_number &&
          String(transaction.credit_card.card_number).trim() === trimmedTargetCardNumber 
        );
      });
    }
  
    console.log(`Filtered transactions for card number ${trimmedTargetCardNumber}:`, this.filteredTransactions);
  }
}