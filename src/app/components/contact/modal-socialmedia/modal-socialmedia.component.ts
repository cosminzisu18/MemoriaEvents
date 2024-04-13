import { Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-modal-socialmedia',
  templateUrl: './modal-socialmedia.component.html',
  styleUrl: './modal-socialmedia.component.scss'
})
export class ModalSocialmediaComponent {
  @Input() public id_contact: any;
  modal = {} as any;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
    this.http.get('http://localhost:5080/api/socialMedias/1').subscribe(( res:any ) => {
      this.modal= res;
      console.log("Social Media ", this.modal)
    })
  };

  save(){
    this.http.put(`http://localhost:5080/api/socialMedias/1`, this.modal).subscribe(() => {
      this.activeModal.close(),
      window.location.reload(),
      this.toast.success('Modificare socialmedia cu succes!');
    },
      (error) => {
        console.log("Eroare la salvare ", error);
      }
    );
  };
}
