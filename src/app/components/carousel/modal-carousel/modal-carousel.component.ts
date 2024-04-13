import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../services/toast.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-modal-carousel',
  templateUrl: './modal-carousel.component.html',
  styleUrl: './modal-carousel.component.scss'
})
export class ModalCarouselComponent implements OnInit {

  @Input() public id_carousel: any;
  modal = {} as any;  showError = false;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private modalCarousel: NgbModal, private toast: ToastService) { }

  ngOnInit(): void {this.loadData()};

  loadData():void{
    this.http.get(`http://localhost:5080/api/carousels`).subscribe(( res:any ) => {
      this.modal= res;
      console.log("modal-carousel ", this.modal)
    })
  };

  save(){
    if(this.id_carousel){
      this.http.put(`http://localhost:5080/api/carousels/${this.id_carousel}`, this.modal).subscribe(() => {
        this.activeModal.close(),
        this.toast.success('Modificare carousel cu succes!');
      },(error) => {console.log("Eroare la salvare ", error);});
    }else{
      this.http.post(`http://localhost:5080/api/carousels`, this.modal).subscribe(() => {
        this.activeModal.close(),
        this.toast.success('Adaugare carousel cu succes!');
      },(error) => {console.log("Eroare la salvare ", error);});
    }
  };

  add(): void {
    this.http.post('http://localhost:5080/api/carousels', {}).subscribe(
      (response: any) => {
        const newImage = { id: response.id, imageUrl: '' };
        this.modal.push(newImage);
        this.toast.success('Camp gol adaugat in baza de date!');
      },
      (error) => {
        console.log('Eroare la adăugarea obiectului gol în baza de date', error);
      }
    );
  };
  
  delete(_row: any){
    const modalRef = this.modalCarousel.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Stergere Imagine`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Vrei sa stergi imaginea <b>${_row.imageUrl}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5080/api/carousels/${_row.id}`).subscribe(
        () =>{ window.location.reload(),
        this.toast.success('Stergere imagine cu succes!')
        },
        (error) => {
          console.log('Delete Img Error', error);
        }
      );
    });
  };
}
