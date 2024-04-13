import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalAboutComponent } from './modal-about/modal-about.component';
import AOS from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isAuthorized: boolean = false;
  about: any = {};

  constructor(private el: ElementRef,private http: HttpClient, private modal: NgbModal,) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true';
    }
    this.loadData();

    AOS.init({disable: 'mobile'});
    AOS.refresh();
  }



  loadData(): void {
    this.http.get('http://localhost:5080/api/abouts').subscribe((res: any) => {
      this.about = res[0];
    });
  }

  editHeader(id_about?: any) { 
    const modalRef = this.modal.open(ModalAboutComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_about = id_about;
    modalRef.closed.subscribe(() => this.loadData());
  }
}
