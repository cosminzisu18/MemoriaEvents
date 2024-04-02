import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { PricesComponent } from './components/prices/prices.component';
import { PackagesComponent } from './components/packages/packages.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './login/auth.service';
import { ModalHeaderComponent } from './components/header/modal-header/modal-header.component';
import { ModalAboutComponent } from './components/about/modal-about/modal-about.component';
import { ModalContactComponent } from './components/contact/modal-contact/modal-contact.component';
import { ModalCarouselComponent } from './components/carousel/modal-carousel/modal-carousel.component';
import { ModalPackagesComponent } from './components/packages/modal-packages/modal-packages.component';
import { ModalServicesComponent } from './components/services/modal-services/modal-services.component';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ModalPricesComponent } from './components/prices/modal-prices/modal-prices.component';

import { NgsRevealModule } from 'ngx-scrollreveal';
import { ModalSocialmediaComponent } from './components/contact/modal-socialmedia/modal-socialmedia.component';
import { LocationsComponent } from './components/locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    PricesComponent,
    PackagesComponent,
    ContactComponent,
    CarouselComponent,
    LoginComponent,
    HomeComponent,
    ModalHeaderComponent,
    ModalAboutComponent,
    ModalContactComponent,
    ModalCarouselComponent,
    ModalPackagesComponent,
    ModalServicesComponent,
    ConfirmDialogComponent,
    ModalPricesComponent,
    ModalSocialmediaComponent,
    LocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
