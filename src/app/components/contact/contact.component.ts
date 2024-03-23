import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalContactComponent } from './modal-contact/modal-contact.component';

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
    if(this.isAuthorized){
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    }
    this.loadData();
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

}
