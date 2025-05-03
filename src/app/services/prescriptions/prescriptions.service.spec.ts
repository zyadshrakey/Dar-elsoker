import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PrescriptionsService } from './prescriptions.service';

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrescriptionsService],
    });

    service = TestBed.inject(PrescriptionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all medicines', () => {
    const mockResponse = { medicines: [] };

    service.getMedicine().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}medicine/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add medicine to a visit', () => {
    const visitId = '123';
    const mockMedicineData = {
      medicines: [
        {
          medicineId: 1,
          dose: '500mg',
          period: '7 days',
        },
      ],
    };
    const mockResponse = { success: true };

    service.addMedicine(visitId, mockMedicineData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}visits/${visitId}/prescription`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockMedicineData);
    req.flush(mockResponse);
  });
});
