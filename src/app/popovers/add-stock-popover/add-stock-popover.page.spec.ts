import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStockPopoverPage } from './add-stock-popover.page';

describe('AddStockPopoverPage', () => {
  let component: AddStockPopoverPage;
  let fixture: ComponentFixture<AddStockPopoverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
