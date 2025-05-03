import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';
import { PrescriptionsService } from '../../services/prescriptions/prescriptions.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases/cases.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

interface medicine {
  medName: string;
  type: string;
  concentration: string;
}
interface MedicineObj {
  medicine: medicine;
  dose: string;
  period: string;
  concentration: string;
}

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NzSelectModule,
    NzMessageModule,
  ],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css',
})
export class PrescriptionsComponent implements OnInit {
  medicineId: number = 0;
  visitId: string | null = this._Active.snapshot.queryParamMap.get('id');
  medicinies: any;
  prescriptions: MedicineObj[] = [];
  patientData: any = {};
  name: string = localStorage.getItem('_name')!;
  constructor(
    private _PrescriptionsService: PrescriptionsService,
    private _CasesService: CasesService,
    private _Active: ActivatedRoute,
    private _printService: NgxPrintService,
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}
  form: FormGroup = this.fb.group({
    inputs: this.fb.array([this.createInputGroup()]),
  });

  ngOnInit(): void {
    this.getMedicine();
    this.getVisitById();
  }

  get inputGroups() {
    return this.form.get('inputs') as FormArray;
  }

  createInputGroup() {
    return this.fb.group({
      type: null,
      medicine: null,
      dose: '',
      period: '',
      concentration: '',
    });
  }

  getMedicine() {
    this._PrescriptionsService.getMedicine().subscribe({
      next: (res) => {
        this.medicinies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMedicineId(event: any) {
    this.medicineId = event;
  }

  addMedicine() {
    this.inputGroups.push(this.createInputGroup());
  }

  getVisitById() {
    this._CasesService.getVisitById(this.visitId).subscribe({
      next: (res) => {
        this.patientData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  print() {
    const object = {
      medicines: this.inputGroups.controls.map((value, i) => {
        return {
          medicineId: value.get('medicine')?.value,
          dose: value.get('dose')?.value,
          period: value.get('period')?.value,
          concentration: value.get('concentration')?.value,
        };
      }),
    };

    this._PrescriptionsService.addMedicine(this.visitId, object).subscribe({
      next: async (res) => {
        console.log(res);
        console.log(this.visitId, this.form.value);

        this.prescriptions = await res.medicines;
        setTimeout(() => {
          this.printFunc();
        }, 1000);
      },
      error: (err) => {
        this.msg.error('برجاء اكمال جميع الحقول');
      },
    });
  }

  async printFunc() {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
    });
    this._printService.print(customPrintOptions);
  }

  getTodayDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // Format the date as "yyyy-MM-dd"
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // Example usage:
  todayDate = this.getTodayDate();
}
