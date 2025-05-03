import { DatePipe } from '@angular/common';
import { PatientService } from './../../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NzModalModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private _PatientService: PatientService,
    private _ActivatedRoute: ActivatedRoute,
    private _printService: NgxPrintService,
    private _Router: Router
  ) {}
  patientId: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('id');
  status: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('status');
  patientData: any;
  prescriptions: any;
  visitData: any;
  isDoctor = localStorage.getItem('_name') === 'د. غادة رءوف' ? true : false;
  name: string = localStorage.getItem('_name')!;
  isDisabled: boolean = false;
  isVisible = false;

  ngOnInit(): void {
    this.getPatient();
    this.patientVisits();
  }
  goBack() {
    this._Router.navigate(['/patient']);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  patientInfo(visitId: string) {
    this._Router.navigate(['/patient-info'], {
      queryParams: { id: visitId },
    });
  }

  patientForm: FormGroup = new FormGroup({
    id: new FormControl(this.patientId),
    contactInfo: new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null),
      address: new FormControl(null),
    }),
    age: new FormControl(0),
  });

  updatePatient() {
    const patientData = this.patientForm.value;
    this._PatientService.updatePatient(patientData, this.patientId).subscribe({
      next: (res) => {
        this.goBack();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  savePatient() {
    const patientData = this.patientForm.value;
    this._PatientService.savePatient(patientData).subscribe({
      next: (res) => {
        this.goBack();
      },
    });
  }

  getPatient() {
    if (this.status === 'show') {
      this.isDisabled = true;
    }
    this._PatientService.getPatientById(this.patientId).subscribe({
      next: (res) => {
        this.patientData = res;
        this.patientForm.patchValue({
          contactInfo: {
            firstName: this.patientData.contactInfo.firstName,
            lastName: this.patientData.contactInfo.lastName,
            email: this.patientData.contactInfo.email,
            phone: this.patientData.contactInfo.phone,
            address: this.patientData.contactInfo.address,
          },
          age: this.patientData.age,
        });
      },
    });
  }

  patientVisits() {
    this._PatientService.allPatientVisits(this.patientId).subscribe({
      next: (res) => {
        this.visitData = res;
        this.prescriptions = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  printFunc(id: any) {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: id,
      previewOnly: true,
    });
    this._printService.print(customPrintOptions);
  }
}
