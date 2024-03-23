import { Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss'
})
export class ModalHeaderComponent {

  @Input() public id_headerinfo: any;

  modal = {} as any;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
      this.http.get('http://localhost:5080/api/headers').subscribe(( res:any ) => {
        this.modal= res[0];
      })
  };

  save(){
    this.http.put(`http://localhost:5080/api/headers/${this.id_headerinfo}`, this.modal).subscribe(() => {
      this.activeModal.close(),
      this.toast.success('Modificare header cu succes!');
    },
      (error) => {
        console.log("Eroare la salvare ", error);
      }
    );
  }

}
