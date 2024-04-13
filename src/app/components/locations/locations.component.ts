import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent {

  constructor(private http: HttpClient) {}

  // loadData(): void {
  //   this.http.get('http://localhost:5080/api/contacts').subscribe((res: any) => {
  //     this.contact = res[0];
  //   })
  // };
}
