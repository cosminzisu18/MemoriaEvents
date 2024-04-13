import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCarouselComponent } from './modal-carousel/modal-carousel.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

  carouselimages = {} as any;
  imagesUrl = '../../../assets/prices/';
  isAuthorized = false;

  constructor(private http: HttpClient, private modal: NgbModal) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true';
    }
    this.loadData();
  };

  loadData(): void {
    this.http.get('http://localhost:5080/api/carousels').subscribe((res: any) => {
      this.carouselimages = res;
    })
  };

  edit(id_carousel?: any) { 
    const modalRef = this.modal.open(ModalCarouselComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_carousel = id_carousel;
    modalRef.closed.subscribe(() => this.loadData());
  };
}
