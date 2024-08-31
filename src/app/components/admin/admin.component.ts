import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { addUser, deleteUser, getAdmins } from '../../store/users/users.action';
import { getAllAdmins } from '../../store/users/users.selector';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('exampleModalCenter', { static: true }) modal!: ElementRef;

  store = inject(Store);
  formBuilder = inject(FormBuilder);
  adminForm!: FormGroup;
  authService = inject(AuthService);

  admins!: IUser[];

  ngOnInit(): void {
    this.store.dispatch(getAdmins());
    this.store.select(getAllAdmins).subscribe((users) => {
      this.admins = users;
    });

    this.adminForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailID: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  onDeleteAdmin(userID: number) {
    this.store.dispatch(deleteUser({ userID: userID }));
  }

  onAddAdmin() {
    const modalElement = this.modal.nativeElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }

  onAddAdminToDatabase() {
    if (this.adminForm.valid) {
      const firstName = this.adminForm.value.firstName;
      const lastName = this.adminForm.value.lastName;
      const emailID = this.adminForm.value.emailID;
      const phone = this.adminForm.value.phone;
      const userTypeID = 2;
      const createdBy = Number(this.authService.getAuthDetails().userID);

      this.store.dispatch(addUser({ userTypeID, firstName, lastName, emailID, phone, createdBy }));
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}
