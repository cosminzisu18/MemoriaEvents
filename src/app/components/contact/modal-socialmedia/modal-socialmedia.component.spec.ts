import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSocialmediaComponent } from './modal-socialmedia.component';

describe('ModalSocialmediaComponent', () => {
  let component: ModalSocialmediaComponent;
  let fixture: ComponentFixture<ModalSocialmediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSocialmediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSocialmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
