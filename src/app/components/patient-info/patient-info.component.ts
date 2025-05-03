import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CasesService } from '../../services/cases/cases.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NzMessageModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css',
})
export class PatientInfoComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _Location: Location,
    private _PatientService: PatientService,
    private _CasesService: CasesService,
    private _ActivatedRoute: ActivatedRoute,
    private msg: NzMessageService
  ) {}
  patientId: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('id');
  status: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('status');
  patientData: any;
  disaple: boolean = false;
  name: string = localStorage.getItem('_name')!;

  ngOnInit(): void {
    if (this.status == 'FOLLOWUP') {
      this.disaple = true;
    } else {
      this.getPatientRecords();
    }
    // this.getVisit();
  }

  goBack() {
    this._Location.back();
  }

  recordForm: FormGroup = new FormGroup({
    patientId: new FormControl(this.patientId),
    type: new FormControl('FOLLOW_UP'),
    nurse: new FormControl(this.name),
    medicalRecord: new FormGroup({
      durationOfDiabetes: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
      medications: new FormControl(''),
      diet: new FormControl(''),
      bloodTestDate: new FormControl(''),
      fastingBloodSugar: new FormControl(''),
      fastingBloodSugarTested: new FormControl(''),
      randomBloodSugar: new FormControl(''),
      randomBloodSugarTested: new FormControl(''),
      cumulativeBloodSugar: new FormControl(''),
      cumulativeBloodSugarTested: new FormControl(''),
      kendyExamination: new FormControl(''),
      kendyExaminationTested: new FormControl(''),
      kendyExaminationDate: new FormControl(''),
      eyeExamination: new FormControl(''),
      eyeExaminationDate: new FormControl(''),
      ecg: new FormControl(''),
      ecgDate: new FormControl(''),
      numbness: new FormControl(''),
      burnings: new FormControl(''),
      sting: new FormControl(''),
      coolerLimbs: new FormControl(''),
      muscleStrain: new FormControl(''),
    }),
  });

  saveVisit() {
    const visitData = this.recordForm.value;
    this._CasesService.followUP(visitData).subscribe({
      next: (res) => {
        this.goBack();
      },
      error: (err) => {
        console.log(err);
        this.msg.error(err.message);
      },
    });
  }

  addPrescriptions() {
    this._Router.navigate(['/prescriptions'], {
      queryParams: { id: this.patientId },
    });
  }

  getPatientRecords() {
    this._CasesService.getPatientMedicalRecords(this.patientId).subscribe({
      next: (res) => {
        this.patientData = res;
        this.recordForm.patchValue({
          medicalRecord: {
            weight: this.patientData.medicalRecord.weight,
            height: this.patientData.medicalRecord.height,
            durationOfDiabetes:
              this.patientData.medicalRecord.durationOfDiabetes,
            medications: this.patientData.medicalRecord.medications,
            diet: this.patientData.medicalRecord.diet,
            bloodTestDate: this.patientData.medicalRecord.bloodTestDate,
            fastingBloodSugar: this.patientData.medicalRecord.fastingBloodSugar,
            fastingBloodSugarTested:
              this.patientData.medicalRecord.fastingBloodSugarTested,
            randomBloodSugar: this.patientData.medicalRecord.randomBloodSugar,
            randomBloodSugarTested:
              this.patientData.medicalRecord.randomBloodSugarTested,
            cumulativeBloodSugar:
              this.patientData.medicalRecord.cumulativeBloodSugar,
            cumulativeBloodSugarTested:
              this.patientData.medicalRecord.cumulativeBloodSugarTested,
            kendyExamination: this.patientData.medicalRecord.kendyExamination,
            kendyExaminationTested:
              this.patientData.medicalRecord.kendyExaminationTested,
            eyeExamination: this.patientData.medicalRecord.eyeExamination,
            ecg: this.patientData.medicalRecord.ecg,
            numbness: this.patientData.medicalRecord.numbness,
            burnings: this.patientData.medicalRecord.burnings,
            sting: this.patientData.medicalRecord.sting,
            coolerLimbs: this.patientData.medicalRecord.coolerLimbs,
            muscleStrain: this.patientData.medicalRecord.muscleStrain,
          },
        });
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
}
