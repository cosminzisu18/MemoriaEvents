import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalHeaderComponent } from './modal-header/modal-header.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerinfo = {} as any;
  isAuthorized = false;

  constructor(private http: HttpClient, private modal: NgbModal) { }

  ngOnInit(): void {
    if(this.isAuthorized){
      this.isAuthorized = sessionStorage.getItem('isAuthorized') == 'true'
    }
    this.loadData();
  }

  loadData(): void {
    this.http.get('http://localhost:5080/api/headers').subscribe((res: any) => {
      this.headerinfo = res[0];
    })
  };

  edit(id_headerinfo?: any) { 
    const modalRef = this.modal.open(ModalHeaderComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_headerinfo = id_headerinfo;
    modalRef.closed.subscribe(() => this.loadData());
  };
 
}
