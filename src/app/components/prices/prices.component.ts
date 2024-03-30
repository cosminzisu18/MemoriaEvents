import { Component, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; 
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalPricesComponent } from './modal-prices/modal-prices.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  
  imageUrl = '../../../assets/prices/';
  prices: any[] = [];
  idTitleSubtitle: any;
  isAuthorized = false;

  constructor(private el: ElementRef,private http: HttpClient, private modal: NgbModal, private toast: ToastService) {}

  ngOnInit(): void {
    this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    this.loadData();
  }
  ngAfterViewInit(): void{
    gsap.registerPlugin(ScrollTrigger);
  }

  initScrollAnimations(): void {
    const animations: [string, number][] = [
      ['.right1', -50],
      // ['.left1', 50],
      // ['.right2', -50],
      // ['.left2', 50],
      // ['.right3', -50],
      // ['.left3', 50]
    ];

    animations.forEach(([selector, x]: [string, number]) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#prețuri',
          start: 'top 80%', 
          end: 'bottom top', 
          toggleActions: 'play none none none'
        }
      })
      .from(selector, { opacity: 0, x, duration: 1 });
    });
  }

  loadData(): void {
    this.http.get('http://localhost:5080/api/prices').subscribe((res: any) => {
      this.prices = res;
      this.idTitleSubtitle = res[0].titleSubtitleId;
      this.initScrollAnimations();
    })
  }

  addEdit(id_price?: any) { 
    const modalRef = this.modal.open(ModalPricesComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_price = id_price;
    modalRef.componentInstance.id_titleSubtitle = this.idTitleSubtitle;
    modalRef.closed.subscribe(() => this.loadData());
  }

  delete(_row: any): void {
    const modalRef = this.modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Stergere Serviciu din Preturi`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Vrei sa stergi serviciul <b>${_row.titleService}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5080/api/prices/${_row.id}`).subscribe(
        () => {
          window.location.reload();
          this.toast.success('Stergere pret cu succes!');
        },
        (error) => {
          console.log('Delete Price Error', error);
        }
      );
    });
  }
}
