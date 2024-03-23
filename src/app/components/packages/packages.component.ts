import { Component, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalPackagesComponent } from './modal-packages/modal-packages.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements OnInit {

  isAuthorized: boolean = false

  packages: any[] = [];

  constructor(private el: ElementRef,private http: HttpClient, private modal: NgbModal) {}

  ngOnInit(): void {
    if(this.isAuthorized){
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    }
    this.initScrollAnimations();
    this.loadData();
  };

  initScrollAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#pachete',
        start: 'center', 
        end: 'bottom top', 
        toggleActions: 'play none none none' 
      }
    });

    tl.from('.inner', { opacity: 0, y: 50, duration: 1 });
  };

  loadData(): void {
    this.http.get('http://localhost:5080/api/packages').subscribe((res: any) => {
      this.packages = res;
    })
  };

  edit(id_package?: any) { 
    const modalRef = this.modal.open(ModalPackagesComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_package = id_package;
    modalRef.closed.subscribe(() => this.loadData());
  };

  getColor(index: number): string {
    switch(index) {
        case 0:
            return 'silver';
        case 1:
            return 'gold';
        case 2:
            return 'aqua';
        default:
            return 'black';
    }
  };
}
