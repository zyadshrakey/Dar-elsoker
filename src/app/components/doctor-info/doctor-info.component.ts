import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-doctor-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzMessageModule],
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.css',
})
export class DoctorInfoComponent implements OnInit {
  doctorsData: any;
  isDisabled: boolean = false;
  status: string | null = this._active.snapshot.queryParamMap.get('status');
  doctorId: string | null = this._active.snapshot.queryParamMap.get('id');

  constructor(
    private _DoctorsService: DoctorsService,
    private _Location: Location,
    private _active: ActivatedRoute,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getDoctorByID();
    this.updateDoctor();
  }

  doctorForm: FormGroup = new FormGroup({
    contactInfo: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
    specialization: new FormControl(''),
    qualification: new FormControl(''),
  });

  savedoctor(): void {
    const doctorData = this.doctorForm.value;
    this._DoctorsService.saveDoctor(doctorData).subscribe({
      next: (res) => {
        this.doctorsData = res;
        this._Location.back();
      },
      error: (err) => {
        console.log(err);
        if (err.error && err.error.subErrors) {
          const subErrors = err.error.subErrors;
          subErrors.forEach(
            (error: { message: string | TemplateRef<void> }) => {
              this.msg.error(error.message);
            }
          );
        } else {
          this.msg.error(err.error.message);
        }
      },
    });
  }

  updateDoctor(): void {
    if (this.status != 'save') {
      const doctorData = this.doctorForm.value;
      this._DoctorsService.reuseDoctor(doctorData, this.doctorId).subscribe({
        next: (res) => {
          this.doctorsData = res;
          this._Location.back();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getDoctorByID(value: boolean = true) {
    if (this.status === 'info') {
      this.isDisabled = value;
    }
    if (this.status != 'save') {
      this._DoctorsService.getDoctorByID(this.doctorId).subscribe({
        next: (res) => {
          this.doctorsData = res;
          this.doctorForm.patchValue({
            contactInfo: {
              firstName: this.doctorsData.contactInfo.firstName,
              lastName: this.doctorsData.contactInfo.lastName,
              email: this.doctorsData.contactInfo.email,
              phone: this.doctorsData.contactInfo.phone,
              address: this.doctorsData.contactInfo.address,
            },
            specialization: this.doctorsData.specialization,
            qualification: this.doctorsData.qualification,
          });
          console.log(this.doctorForm);
        },
      });
    }
  }

  goBack() {
    this._Location.back();
  }
}
