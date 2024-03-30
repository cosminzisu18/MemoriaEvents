import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  scrolled: boolean = false;
  navbar = {} as any;
  navbarNavv = {} as any;
  navbarPhone = {} as any;
  isAuthorized: boolean = false
  constructor(private http: HttpClient, private modal: NgbModal) { }

  ngOnInit(): void {
    this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    this.loadData();
  };

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50; 
  };
  
  isMobile() {
    return window.innerWidth <= 768;
  };

  loadData(): void {
    this.http.get('http://localhost:5080/api/Navvs').subscribe((res: any) => {
      this.navbar  = res;
      this.navbarNavv  = this.navbar.navvs[0];
      this.navbarPhone = this.navbar.navvs[0].contact.number
    })
  };
  
}
