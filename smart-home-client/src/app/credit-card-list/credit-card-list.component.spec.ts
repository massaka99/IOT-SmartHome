import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardlistComponent } from './credit-card-list.component';

describe('CreditCardListComponent', () => {
  let component: CreditcardlistComponent;
  let fixture: ComponentFixture<CreditcardlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditcardlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
