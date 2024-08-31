import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  authService = inject(AuthService);

  isSuperAdmin = false;
  userName!: string;

  ngOnInit(): void {
    const userTypeID = this.authService.getAuthDetails().userTypeID;
    this.isSuperAdmin = userTypeID === 1;
    this.userName = this.authService.getAuthDetails().firstName +
      ' ' + this.authService.getAuthDetails().lastName;
  }
}
