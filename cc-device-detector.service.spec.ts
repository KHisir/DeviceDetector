/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CcDeviceDetectorService } from './cc-device-detector.service';

describe('Service: CcDeviceDetector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcDeviceDetectorService]
    });
  });

  it('should ...', inject([CcDeviceDetectorService], (service: CcDeviceDetectorService) => {
    expect(service).toBeTruthy();
  }));
});
