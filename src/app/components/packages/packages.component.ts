import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalPackagesComponent } from './modal-packages/modal-packages.component';
import AOS from 'aos';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'] // Modificare aici
})
export class PackagesComponent implements OnInit {

  isAuthorized: boolean = false

  packages: any[] = [];  services: any[] = []; packageServices= {} as any; 

  constructor(private el: ElementRef,private http: HttpClient, private modal: NgbModal) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true';
    }
    this.loadData();
    
    AOS.init({disable: 'mobile'});
    AOS.refresh();
  };



  loadData(): void {
    this.http.get('http://localhost:5080/api/packages').subscribe((res: any) => {
      this.packages = res.packages; 
      this.services = res.services;
    });
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
