import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { addUser, deleteUser, getEmployees } from '../../store/users/users.action';
import { getAllEmployees } from '../../store/users/users.selector';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  @ViewChild('exampleModalCenter', { static: true }) modal!: ElementRef;

  store = inject(Store);
  formBuilder = inject(FormBuilder);
  employeeForm!: FormGroup;
  authService = inject(AuthService);

  employees!: IUser[];

  ngOnInit(): void {
    this.store.dispatch(getEmployees());
    this.store.select(getAllEmployees).subscribe((users) => {
      this.employees = users;
    });

    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailID: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  onAddEmployee() {
    const modalElement = this.modal.nativeElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }

  onAddEmployeeToDatabase() {
    if (this.employeeForm.valid) {
      const firstName = this.employeeForm.value.firstName;
      const lastName = this.employeeForm.value.lastName;
      const emailID = this.employeeForm.value.emailID;
      const phone = this.employeeForm.value.phone;
      const userTypeID = 3;
      const createdBy = Number(this.authService.getAuthDetails().userID);

      this.store.dispatch(addUser({ userTypeID, firstName, lastName, emailID, phone, createdBy }));
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onDeleteEmployee(userID: number) {
    this.store.dispatch(deleteUser({ userID: userID }));
  }
}
