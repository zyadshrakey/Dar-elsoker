import { TestBed } from '@angular/core/testing';

import { IsLoaderService } from './is-loader.service';

describe('IsLoaderService', () => {
  let service: IsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
