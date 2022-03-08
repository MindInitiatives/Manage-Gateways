import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGatewaysComponent } from './all-gateways.component';

describe('AllGatewaysComponent', () => {
  let component: AllGatewaysComponent;
  let fixture: ComponentFixture<AllGatewaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGatewaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
