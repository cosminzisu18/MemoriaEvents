import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isAuthorized = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.isAuthorized$.subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      }
    );
  }

  ngOnDestroy() {
    // Dezabonează-te când serviciul este distrus pentru a preveni memory leaks
    this.authSubscription.unsubscribe();
  }

  subscribeToAuthorization() {
    // Metoda care trebuie apelată din componenta care utilizează acest serviciu
    this.authSubscription = this.authService.isAuthorized$.subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      }
    );
  }
}
