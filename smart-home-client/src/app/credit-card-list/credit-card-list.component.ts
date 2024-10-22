import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditCardService } from '../services/services/credit-card.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-creditcardlist',
  templateUrl: './credit-card-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./credit-card-list.component.css'],
  providers: [DecimalPipe],
})
export class CreditcardlistComponent implements OnInit {
  creditCards: any[] = []; 
  filteredCards: any[] = [];
  filterText: string = '';
  showModal: boolean = false;
  creditCardDetails: any = {}; 
  transactions: any[] = []; 
  filteredTransactions: any[] = []; 
  filterCardNumber: string = ''; 

  constructor(
    private router: Router,
    private creditCardService: CreditCardService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadCreditCards();
    this.loadTransactions(); 
  }

  loadCreditCards() {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        this.creditCards = cards;
        this.filteredCards = [...this.creditCards];
      },
      error: (error) => {
        console.error('Error fetching credit cards:', error);
      }
    });
  }

  loadTransactionsForCard(card_number: string) {
    const trimmedCardNumber = card_number.trim();
    this.filteredTransactions = this.transactions.filter(
      (t) =>
        t.credit_card &&
        t.credit_card.card_number &&
        String(t.credit_card.card_number).trim() === trimmedCardNumber
    );
    console.log('Transactions for card:', this.filteredTransactions);
  }

  GetSpecificCard(card_number: string) {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        const targetCardNumber = String(card_number).trim(); 
        const foundCard = cards.find(
          (card) => String(card.card_number).trim() === targetCardNumber 
        );
  
        if (foundCard) {
          this.creditCardDetails = foundCard;
          console.log('Fetched card details:', this.creditCardDetails);

          this.filterTransactions(targetCardNumber);
          this.showModal = true;
          this.cdr.detectChanges(); 
          console.log('Show modal:', this.showModal);
        } else {
          console.error('Card not found');
        }
      },
      error: (error) => {
        console.error('Error fetching credit card details:', error);
      }
    });
  }

  loadTransactions() {
    this.creditCardService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('All transactions:', this.transactions);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  filterTransactions(targetCardNumber: string) {
    const trimmedTargetCardNumber = targetCardNumber.trim(); 
    this.filteredTransactions = this.transactions.filter((transaction) => {
      return (
        transaction.credit_card &&
        transaction.credit_card.card_number &&
        String(transaction.credit_card.card_number).trim() === trimmedTargetCardNumber 
      );
    });
    console.log(`Filtered transactions for card number ${trimmedTargetCardNumber}:`, this.filteredTransactions);
  }

  filterCards() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredCards = this.creditCards.filter((card) =>
      card.cardholder_name.toLowerCase().includes(lowerCaseFilter)
    );
  }

  onCardClick(card_number: string) {
    this.GetSpecificCard(card_number);
    this.loadTransactionsForCard(card_number); 
  }

  closeModal() {
    this.showModal = false; 
    this.cdr.detectChanges(); 
  }

  DeleteCreditCard(card_number: string) {
    this.creditCardService.deleteCreditCard(card_number).subscribe({
      next: () => {
        console.log('Card removed:', card_number);
        this.loadCreditCards();
      },
      error: (error) => {
        console.error('Error removing card:', error);
      }
    });
  }

  removeCard() {
    if (!this.creditCardDetails || !this.creditCardDetails.card_number) {
      console.error('No card selected for removal');
      return;
    }

    const cardNumber = this.creditCardDetails.card_number;

    this.creditCardService.deleteCreditCard(cardNumber).subscribe({
      next: () => {
        console.log('Card removed:', cardNumber);

        this.loadCreditCards();

        this.closeModal();
      },
      error: (error) => {
        console.error('Error removing card:', error);
      }
    });
  }
}
