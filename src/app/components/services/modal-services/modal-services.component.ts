import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-modal-services',
  templateUrl: './modal-services.component.html',
  styleUrl: './modal-services.component.scss'
})
export class ModalServicesComponent implements OnInit{


  @Input() public id_service: any;
  modal = {} as any;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
    if(this.id_service){
      this.http.get(`http://localhost:5080/api/services/${this.id_service}`).subscribe(( res:any ) => {
        this.modal= res;
        console.log("modal-services ", this.modal);
      })
    }
  };

  
  save(){
    if(this.id_service){
      this.http.put(`http://localhost:5080/api/services/${this.id_service}`, this.modal).subscribe(() => {
        this.activeModal.close(),
        window.location.reload(),
        this.toast.success('Modificare services cu succes!');
      },
        (error) => {
          console.log("Eroare la salvare ", error);
        }
      );
    }else{
      this.modal.titleSubtitleId = 1;
      this.http.post(`http://localhost:5080/api/services`, this.modal).subscribe(() => {
        this.activeModal.close(),
        window.location.reload(),
        this.toast.success('Adaugare services cu succes!');
      },
        (error) => {
          console.log("Eroare la salvare ", error);
        }
      );
    }
  };


}
