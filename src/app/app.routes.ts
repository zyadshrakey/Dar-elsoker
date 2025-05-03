import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CasesComponent } from './components/cases/cases.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientComponent } from './components/patient/patient.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
// import { authGuard } from './guard/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    // canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'لوحه التحكم',
      },
      { path: 'cases', component: CasesComponent, title: 'الحالات' },
      { path: 'doctors', component: DoctorsComponent, title: 'الاطباء' },
      { path: 'patient', component: PatientComponent, title: 'المرضي' },
      {
        path: 'patient-details',
        component: PatientDetailsComponent,
        title: 'ملف المريض',
      },
      {
        path: 'patient-info',
        component: PatientInfoComponent,
        title: 'بيانات المريض',
      },
      { path: 'doctor-info', component: DoctorInfoComponent },
      { path: 'personal-info', component: PersonalInfoComponent },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent,
        title: 'إضافه روشته',
      },
    ],
  },
  { path: 'login', component: LoginComponent, title: 'تسجيل الدخول' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
