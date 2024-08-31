import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastrService = inject(ToastrService);

  logout() {
    this.authService.logout();
  }

  isSuperAdmin(): boolean {
    return this.authService.getAuthDetails().userTypeID === 1;
  }

  isAdmin(): boolean {
    return this.authService.getAuthDetails().userTypeID === 2;
  }

  isEmployee(): boolean {
    return this.authService.getAuthDetails().userTypeID === 3;
  }

  isLinkActive(link: string): boolean {
    return this.router.isActive(link, true);
  }
}
