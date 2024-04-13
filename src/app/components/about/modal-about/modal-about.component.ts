import { Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-modal-about',
  templateUrl: './modal-about.component.html',
  styleUrl: './modal-about.component.scss'
})
export class ModalAboutComponent {

  @Input() public id_about: any;
  modal: any ;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
    this.http.get('http://localhost:5080/api/abouts').subscribe(( res:any ) => {
      this.modal= res[0];
      console.log("Modal ", this.modal)
    })
  };

  save(){
    this.http.put(`http://localhost:5080/api/abouts/${this.id_about}`, this.modal).subscribe(() => {
      this.activeModal.close(),
      this.toast.success('Modificare about cu succes!');
    },
      (error) => {
        console.log("Eroare la salvare ", error);
      }
    );
  }
}
