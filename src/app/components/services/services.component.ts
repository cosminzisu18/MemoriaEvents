import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalServicesComponent } from './modal-services/modal-services.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastService } from '../../services/toast.service';
import AOS from 'aos'; 

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  isAuthorized = false;
  services: any[] = [];

  constructor(private el: ElementRef, private http: HttpClient, private modal: NgbModal, private toast: ToastService) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true';
    }
    this.loadData();
    AOS.init({disable: 'mobile'});//AOS - 2
    AOS.refresh();//refresh method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.

  }

  loadData(): void {
    this.http.get('http://localhost:5080/api/services').subscribe((res: any) => {
      this.services = res;
    });
  }


  addEdit(id_service?: any) { 
    const modalRef = this.modal.open(ModalServicesComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_service = id_service;
    modalRef.closed.subscribe(() => this.loadData());
  };

  delete(_row: any){
    const modalRef = this.modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Stergere Serviciu`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Vrei sa stergi serviciul <b>${_row.serviceName}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5080/api/services/${_row.id}`).subscribe(
        () =>{ window.location.reload(),
        this.toast.success('Stergere serviciu cu succes!')
        },
        (error) => {
          console.log('Delete Employer Error', error);
        }
      );
    });
  };
}
