import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../services/toast.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal-prices',
  templateUrl: './modal-prices.component.html',
  styleUrl: './modal-prices.component.scss'
})
export class ModalPricesComponent {

  @Input() public id_price: any;
  @Input() public id_titleSubtitle: any;
  
  modal = {} as any;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService, private modalPrice: NgbModal) { }

  ngOnInit(): void { 
    if(this.id_price){
      this.loadData();
    }
  };

  loadData(): void{
    this.http.get(`http://localhost:5080/api/prices/${this.id_price}`).subscribe(( res:any ) => {
      this.modal= res;
    })
  }

  
  save(){
    this.modal.titleSubtitleId = this.id_titleSubtitle;

    if(this.id_price){
      this.http.put(`http://localhost:5080/api/prices/${this.id_price}`, this.modal).subscribe(() => {
        this.activeModal.close(),
        this.toast.success('Modificare price cu succes!');
        window.location.reload();
      },
        (error) => {
          console.log("Eroare la salvare ", error);
        }
      );
    }else{
      this.http.post(`http://localhost:5080/api/prices`, this.modal).subscribe(() => {
        
        this.activeModal.close(),
        this.toast.success('Adaugare price cu succes!');
        window.location.reload();
      },
        (error) => {
          console.log("Eroare la salvare ", error);
        }
      );
    }
  };

  add(): void {
    const newCharacteristic = {
      characteristics: 'Caracteristica noua',
      pricesId: this.id_price
    };
    this.http.post('http://localhost:5080/api/prices/pricesCharacteristics', newCharacteristic).subscribe(
      (response: any) => {
        this.toast.success('Caracteristica noua adăugată cu succes!'),
        this.modal.pricesCharacteristics.push(newCharacteristic);
      },
      (error) => {
        console.log('Eroare la adăugarea caracteristicii noi în baza de date', error);
      }
    );
  };

  delete(_row: any){
    const modalRef = this.modalPrice.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Stergere Caracteristică`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Vrei sa stergi caracteristica <b>${_row.characteristics}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5080/api/prices/pricesCharacteristics/${_row.id}`).subscribe(
        () =>{ window.location.reload(),
        this.toast.success('Stergere caracteristica cu succes!')
        },
        (error) => {
          console.log('Delete Price Error', error);
        }
      );
    });
  };
}
