import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient/patient.service';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    SearchPipe,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    NzEmptyModule,
    NzPopconfirmModule,
    NzModalModule,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit {
  searchvalue: string = '';
  patientData: any[] = [];
  isDoctor = localStorage.getItem('_name') === 'د. غادة رءوف' ? true : false;
  name: string = localStorage.getItem('_name')!;

  constructor(
    private _PatientService: PatientService,
    private _Router: Router,
    private nzMessageService: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getPatient();
  }

  goPatientDetails(id: string, status: string) {
    this._Router.navigate(['/patient-details'], {
      queryParams: { id: id, status: status },
    });
  }

  goPatientinfo(id: string, status: string) {
    this._Router.navigate(['/patient-info'], {
      queryParams: { id: id, status: status },
    });
  }

  goToSave(status: string) {
    this._Router.navigate(['/patient-details'], {
      queryParams: { status: status },
    });
  }

  getPatient() {
    this._PatientService.getPatientPage().subscribe({
      next: (res) => {
        this.patientData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePatient(id: number) {
    this.modal.confirm({
      nzTitle: 'هل انت متاكد من حذف هذا المريض ؟',
      nzOkText: 'نعم',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this._PatientService.deletePatient(id).subscribe({
          next: (res) => {
            this.getPatient();
            this.nzMessageService.success('تم الحذف بنجاح');
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      nzCancelText: 'لا',
    });
  }

  // pageChanged(event: number): void {
  //   this._PatientService.getPatientPage(event).subscribe({
  //     next: (res) => {
  //       this.patientData = res.content;
  //       this.pageSize = res.pageable.pageSize;
  //       this.pageNumber = res.pageable.pageNumber;
  //       this.totalElements = res.totalElements;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
