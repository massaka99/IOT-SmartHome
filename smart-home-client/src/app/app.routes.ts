import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreditcardlistComponent } from './credit-card-list/credit-card-list.component';
import { AddcreditcardComponent } from './add-credit-card/add-credit-card.component';
import { TransactionsComponent } from './transactions/transactions.component';


export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'credit-card-list', component: CreditcardlistComponent },
  { path: 'add-credit-card', component: AddcreditcardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions', loadComponent: () => import('./transactions/transactions.component').then(m => m.TransactionsComponent),},
  { path: '**', redirectTo: '/transactions',},
  { path: 'transaction-list', loadComponent: () => import('./transactions/transaction-list.component').then(m => m.TransactionListComponent),},
  { path: '**', redirectTo: '/transactions',}
];  