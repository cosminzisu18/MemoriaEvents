import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicesComponent } from './modal-services.component';

describe('ModalServicesComponent', () => {
  let component: ModalServicesComponent;
  let fixture: ComponentFixture<ModalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
