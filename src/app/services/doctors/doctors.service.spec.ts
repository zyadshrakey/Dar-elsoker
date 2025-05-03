import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DoctorsService } from './doctors.service';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorsService],
    });

    service = TestBed.inject(DoctorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all doctors by date', () => {
    const mockResponse = { doctors: [] };
    const date = '2024-08-23';

    service.getAllDoctor(date).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}doctors/by-date?date=${date}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a doctor by ID', () => {
    const mockResponse = { doctor: {} };
    const id = '123';

    service.getDoctorByID(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}doctors/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should save a doctor', () => {
    const doctorData = { name: 'Dr. Smith' };
    const mockResponse = { success: true };

    service.saveDoctor(doctorData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}doctors`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(doctorData);
    req.flush(mockResponse);
  });

  it('should update a doctor by ID', () => {
    const doctorData = { name: 'Dr. John Doe' };
    const id = '123';
    const mockResponse = { success: true };

    service.reuseDoctor(doctorData, id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}doctors/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(doctorData);
    req.flush(mockResponse);
  });

  it('should delete a doctor by ID', () => {
    const id = 123;
    const mockResponse = { success: true };

    service.deleteDoctor(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}doctors/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should retrieve all doctor redirections by ID and date', () => {
    const id = '123';
    const date = '2024-08-23';
    const mockResponse = { redirections: [] };

    service.allDoctorRedirections(id, date).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}doctors/${id}/redirections?date=${date}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update doctor availability', () => {
    const doctorId = '123';
    const availability = true;
    const mockResponse = { success: true };

    service.updateDoctor(doctorId, availability).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}doctors/${doctorId}/availability?availability=${availability}`
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      id: doctorId,
      availability: availability,
    });
    req.flush(mockResponse);
  });
});
