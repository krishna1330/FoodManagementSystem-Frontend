import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IAuth } from '../../models/auth.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  toastrService = inject(ToastrService);
  router = inject(Router);

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailID: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const emailID = this.loginForm.value.emailID;
      const password = this.loginForm.value.password;

      this.authService.login(emailID, password).subscribe({
        next: (response: HttpResponse<IAuth>) => {
          if (response.status === 200) {
            response.body != null ? this.authService.saveToCookies(response.body) : null;
            this.toastrService.success(response.body?.responseMessage || 'Login successful.');
            this.router.navigate(['/']);
          }
        },

        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toastrService.error('Invalid credentials.');
          } else if (error.status === 409) {
            this.toastrService.info('Your account is inactive or deleted.');
          } else {
            console.log(error);
            this.toastrService.warning('Login failed. Please try again.');
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
