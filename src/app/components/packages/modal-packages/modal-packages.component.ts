import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-modal-packages',
  templateUrl: './modal-packages.component.html',
  styleUrl: './modal-packages.component.scss'
})
export class ModalPackagesComponent implements OnInit{

  @Input() public id_package: any;
  modal = {} as any;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
    this.http.get(`http://localhost:5080/api/packages/${this.id_package}`).subscribe(( res:any ) => {
      this.modal= res;
      console.log("modal-packages ", this.modal)
    })
  };

  
  save(){
    this.http.put(`http://localhost:5080/api/packages/${this.id_package}`, this.modal).subscribe(() => {
      this.activeModal.close(),
      this.toast.success('Modificare packages cu succes!');
    },
      (error) => {
        console.log("Eroare la salvare ", error);
      }
    );
  };


}
