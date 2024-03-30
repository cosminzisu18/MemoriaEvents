import { Component, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalAboutComponent } from './modal-about/modal-about.component';

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
    this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true';
    this.loadData();
    console.log("Este autorizat? ", this.isAuthorized);
  }

  initAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#viziune',
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
      this.initAnimations();
    });
  }

  editHeader(id_about?: any) { 
    const modalRef = this.modal.open(ModalAboutComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_about = id_about;
    modalRef.closed.subscribe(() => this.loadData());
  }
}
