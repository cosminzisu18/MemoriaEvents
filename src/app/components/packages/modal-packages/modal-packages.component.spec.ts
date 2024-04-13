import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPackagesComponent } from './modal-packages.component';

describe('ModalPackagesComponent', () => {
  let component: ModalPackagesComponent;
  let fixture: ComponentFixture<ModalPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
