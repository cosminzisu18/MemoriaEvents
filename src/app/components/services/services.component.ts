import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalServicesComponent } from './modal-services/modal-services.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit {

  isAuthorized = false;
  services: any[] = [];

  constructor(private el: ElementRef, private http: HttpClient, private modal: NgbModal, private toast: ToastService) {}

  ngOnInit(): void {
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    this.loadData();
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initScrollAnimations();
  }

  loadData(): void {
    this.http.get('http://localhost:5080/api/services').subscribe((res: any) => {
      this.services = res;
    })
  };

  private initScrollAnimations(): void {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#servicii",
        start: 'top 10%',
        end: 'bottom top',
        toggleActions: 'play none none none'
      },
    })
    .from('.left-to-right', { opacity: 0, x: -100 , duration: 2 })
    // .from('.right-to-left', { x: '100%', opacity: 0, rotation: 360,  duration: 1 }, "-=1")
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
