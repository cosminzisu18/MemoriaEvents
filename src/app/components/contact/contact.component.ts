import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalContactComponent } from './modal-contact/modal-contact.component';
import { ModalSocialmediaComponent } from './modal-socialmedia/modal-socialmedia.component';
import AOS from 'aos';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{

  constructor(private http: HttpClient, private modal: NgbModal) {}

  isAuthorized: boolean = false
  contact = {} as any;


  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true';
    }
    this.loadData();

    AOS.init({disable: 'mobile'});
    AOS.refresh();
  }

  loadData(): void {
    this.http.get('http://localhost:5080/api/contacts').subscribe((res: any) => {
      this.contact = res[0];
    })
  };

  edit(id_contact?: any) { 
    const modalRef = this.modal.open(ModalContactComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_contact = id_contact;
    modalRef.closed.subscribe(() => this.loadData());
  };

  editSocialMedia() { 
    const modalRef = this.modal.open(ModalSocialmediaComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.closed.subscribe(() => this.loadData());
  };

}
