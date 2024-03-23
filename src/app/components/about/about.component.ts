import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; 
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalAboutComponent } from './modal-about/modal-about.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isAuthorized = false;
  about = {} as any;

  constructor(private http: HttpClient, private modal: NgbModal) {}

  ngOnInit(): void {
    if(this.isAuthorized){
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    }
    gsap.registerPlugin(ScrollTrigger);
    this.initAnimations();
    this.loadData();
  }

  private initAnimations(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about', 
        start: 'top 20%',
        end: 'bottom top', 
        toggleActions: 'play none none none'
      }
    });

    tl.from('.about_heading', { opacity: 0, x: -100, duration: 0.5 }); 
    tl.from('.about-par', { opacity: 0, x: -100, duration: 0.5 }); 
    tl.from('.img-about', { opacity: 0, x: 100, duration: 0.5 }); 
    tl.from('.caracteristics', { opacity: 0, y: 50, duration: 0.5 }); 
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
