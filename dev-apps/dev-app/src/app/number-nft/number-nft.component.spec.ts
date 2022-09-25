import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberNftComponent } from './number-nft.component';

describe('NumberNftComponent', () => {
  let component: NumberNftComponent;
  let fixture: ComponentFixture<NumberNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberNftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
