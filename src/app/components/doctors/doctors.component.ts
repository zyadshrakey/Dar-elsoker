import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { SearchPipe } from '../../pipes/search/search.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    CommonModule,
    SearchPipe,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDropDownModule,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  searchvalue: string = '';
  doctorsData: any[] = [];
  isDoctor = localStorage.getItem('_name') === 'د. غادة رءوف' ? true : false;
  name: string = localStorage.getItem('_name')!;
  constructor(
    private _DoctorsService: DoctorsService,
    private _Router: Router,
    private msg: NzMessageService,
    private modal: NzModalService
  ) {}
  ngOnInit(): void {
    this.getAllDoctors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this._DoctorsService.getAllDoctor(this.todayDate).subscribe({
      next: (res) => {
        this.doctorsData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteDoctor(id: number) {
    this.modal.confirm({
      nzTitle: 'هل انت متاكد من حذف هذا الطبيب ؟',
      nzOkText: 'نعم',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this._DoctorsService.deleteDoctor(id).subscribe({
          next: (res) => {
            this.getAllDoctors();
            this.msg.success('تم حذف الطبيب');
          },
          error: (err) => {
            this.msg.error('هذا الطبيب لديه حالات محوله لا يمكن حذفه');
          },
        });
      },
      nzCancelText: 'لا',
    });
  }

  goWithId(status: string, id: string) {
    this._Router.navigate(['/doctor-info'], {
      queryParams: { status: status, id: id },
    });
  }

  getPatientRedirect(id: string) {
    this._Router.navigate(['/cases'], {
      queryParams: { id: id },
    });
  }
  goInfo() {
    this._Router.navigate(['/doctor-info'], {
      queryParams: { status: 'save' },
    });
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
