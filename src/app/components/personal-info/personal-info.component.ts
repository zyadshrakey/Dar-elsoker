import { Location } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CasesService } from '../../services/cases/cases.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NzMessageModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {
  constructor(
    private _Location: Location,
    private _CasesService: CasesService,
    private msg: NzMessageService
  ) {}
  name: string = localStorage.getItem('_name')!;

  detailsForm: FormGroup = new FormGroup({
    patient: new FormGroup({
      contactInfo: new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        phone: new FormControl(null),
        address: new FormControl(null),
      }),
      age: new FormControl(null),
    }),
    type: new FormControl('CHECKUP'),
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

  goBack() {
    this._Location.back();
  }

  saveVisit() {
    const visitData = this.detailsForm.value;
    this._CasesService.checkUP(visitData).subscribe({
      next: (res) => {
        this.goBack();
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
