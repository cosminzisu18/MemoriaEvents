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
  modal = {} as any;   packageServices = {} as any;  
  showError = false; 
  selectedServices: number[] = [];
  selectedPackage: any; 

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
    this.http.get(`http://localhost:5080/api/packages/${this.id_package}`).subscribe(( res:any ) => {
      this.modal = res;
      this.selectedPackage = this.modal.packages; 
    });
    this.http.get(`http://localhost:5080/api/packageServices`).subscribe(( res:any ) => {
      this.packageServices = res;
    });
  };
  
  save(): void {
    this.http.put(`http://localhost:5080/api/packages/${this.id_package}`, this.modal.packages).subscribe(() => {
      this.activeModal.close();
      this.toast.success('Modificare packages cu succes!');
    }, (error) => {
      console.log("Eroare la salvare ", error);
    });
    this.selectedServices.forEach((serviceId: any) => {
      if (!this.isServiceSelected(serviceId)) {
        const body = {
          packageId: this.selectedPackage.id,
          serviceId: serviceId
        };
        this.http.post('http://localhost:5080/api/PackageServices', body).subscribe(() => {
          console.log('Serviciu trimis cu succes.');
        }, (error) => {
          console.log('Eroare la trimiterea serviciului: ', error);
        });
      }
    });
  }

  resetPackageServices(packageId: number): void {
    const packageServicesToDelete = this.packageServices.filter((ps:any) => ps.packageId === packageId);
    packageServicesToDelete.forEach((ps: any) => {
      const packageServiceIdToDelete = ps.id;
      this.http.delete(`http://localhost:5080/api/packageServices/${packageServiceIdToDelete}`).subscribe(() => {
        this.toast.success('Stergere servicii cu succes!');
      }, (error) => {
        console.log(`Eroare la ștergerea serviciului cu id-ul ${packageServiceIdToDelete} din PackageServices: `, error);
      });
    });
    location.reload();
  }
  


  isServiceSelected(serviceId: number): boolean {
    return this.selectedPackage.services.some((service:any) => service.id === serviceId);
  };
  
  updateMessage(service: any, pack: any, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const serviceId = service.id;
      if (target.checked) {
        if (!this.isServiceSelected(serviceId)) {
          this.selectedServices.push(serviceId);
        }
      } else {
        // Verifică dacă serviciul este deja selectat
        if (this.isServiceSelected(serviceId)) {
          // Setează înapoi checkbox-ul la checked pentru a preveni deselectarea
          target.checked = true;
        }
      }
    }
  }
  
  
}
