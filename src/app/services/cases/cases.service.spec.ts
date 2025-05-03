import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CasesService } from './cases.service';

describe('CasesService', () => {
  let service: CasesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CasesService],
    });

    service = TestBed.inject(CasesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve statistics by date', () => {
    const mockResponse = { statistics: {} };
    const date = '2024-08-23';

    service.getStatisticsByDate(date).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}visits/statistics?date=${date}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update visit completion status', () => {
    const visitId = '123';
    const completed = true;
    const mockResponse = { success: true };

    service.updateVisit(visitId, completed).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}visits/${visitId}/visit-completed?completed=${completed}`
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      id: visitId,
      visitCompleted: completed,
    });
    req.flush(mockResponse);
  });

  it('should update redirection completion status', () => {
    const visitId = '123';
    const completed = true;
    const mockResponse = { success: true };

    service.updateRedirect(visitId, completed).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}visits/${visitId}/redirection-completed?completed=${completed}`
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      id: visitId,
      redirectionCompleted: completed,
    });
    req.flush(mockResponse);
  });

  it('should redirect visit to a doctor', () => {
    const visitId = '123';
    const doctorId = '456';
    const mockResponse = { success: true };

    service.rediretToDoctor(visitId, doctorId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}visits/${visitId}/doctor-redirected-to/${doctorId}`
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ id: visitId });
    req.flush(mockResponse);
  });

  it('should retrieve visits by date and status', () => {
    const date = '2024-08-23';
    const status = 'completed';
    const mockResponse = { visits: [] };

    service.allByDateAndStatus(date, status).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}visits/by-date/${date}?status=${status}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve visits by page number', () => {
    const pageNum = 1;
    const mockResponse = { visits: [] };

    service.getVisitsPage(pageNum).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}visits?page=${pageNum}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve visit by ID', () => {
    const id = '123';
    const mockResponse = { visit: {} };

    service.getVisitById(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}visits/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve patient medical records by ID', () => {
    const id = '123';
    const mockResponse = { records: [] };

    service.getPatientMedicalRecords(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}visits/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a follow-up visit', () => {
    const visitData = { patientId: '123', type: 'follow-up' };
    const mockResponse = { success: true };

    service.followUP(visitData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}visits`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(visitData);
    req.flush(mockResponse);
  });

  it('should create a check-up visit', () => {
    const visitData = { patientId: '123', type: 'check-up' };
    const mockResponse = { success: true };

    service.checkUP(visitData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}visits/check-up`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(visitData);
    req.flush(mockResponse);
  });
});
