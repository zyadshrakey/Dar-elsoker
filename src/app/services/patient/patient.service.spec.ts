import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService],
    });

    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all patients', () => {
    const mockResponse = { patients: [] };

    service.getPatientPage().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}patients/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a patient by ID', () => {
    const id = '123';
    const mockResponse = { patient: {} };

    service.getPatientById(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}patients/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update a patient by ID', () => {
    const id = '123';
    const patientData = { name: 'John Doe' };
    const mockResponse = { success: true };

    service.updatePatient(patientData, id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}patients/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(patientData);
    req.flush(mockResponse);
  });

  it('should save a new patient', () => {
    const patientData = { name: 'Jane Doe' };
    const mockResponse = { success: true };

    service.savePatient(patientData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}patients`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(patientData);
    req.flush(mockResponse);
  });

  it('should retrieve all visits for a patient by ID', () => {
    const id = '123';
    const mockResponse = { visits: [] };

    service.allPatientVisits(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}patients/${id}/visits`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a visit by ID', () => {
    const id = '123';
    const mockResponse = { visit: {} };

    service.getVisitById(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}visits/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete a patient by ID', () => {
    const id = 123;
    const mockResponse = { success: true };

    service.deletePatient(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}patients/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
