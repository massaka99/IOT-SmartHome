import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcreditcardComponent } from './add-credit-card.component';

describe('AddCreditCardComponent', () => {
  let component: AddcreditcardComponent;
  let fixture: ComponentFixture<AddcreditcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcreditcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcreditcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
