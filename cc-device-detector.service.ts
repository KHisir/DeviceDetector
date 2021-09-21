/**
 * @author Kalender Hisir
 * @desc Returns the device and browser information
 * @returns see each function!
 */

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BROWSERS,
  DEVICES,
  OS,
  OS_VERSIONS,
} from './cc-device-detector.constants';
import {
  BROWSERS_REG,
  BROWSER_VERSIONS_REG,
  DEVICES_REG,
  MOBILES_REG,
  OS_REG,
  OS_VERSIONS_REG,
  TABLETS_REG,
} from './cc-device-detector.regexp';
import { DeviceInfo } from './deviceInfo';
import { OrientationType } from './orientationType';
declare global {
  interface Window {
    DocumentTouch: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CcDeviceDetectorService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.DeviceInfo = this.getDeviceInfo();
  }

  protected UNKNOWN: string = 'Unknown';
  public DeviceInfo: DeviceInfo;

  isDesktop(): boolean {
    let desktop: boolean = false;
    const device: string = this.getDevice();
    if (device === this.UNKNOWN) {
      if (this.isMobile() || this.isTablet()) {
        desktop = false;
      }
    }

    for (const [key, value] of Object.entries(DEVICES)) {
      if (String(value) === device) {
        desktop = true;
        break;
      }
    }
    return desktop;
  }

  isMobile(): boolean {
    let mobile: boolean = false;
    for (const [key, value] of Object.entries(MOBILES_REG)) {
      if (value instanceof RegExp) {
        if (value.test(window.navigator.userAgent) && this.isTouch() === true) {
          mobile = true;
          break;
        }
      }
    }
    return mobile;
  }

  isTablet(): boolean {
    let tablet: boolean = false;
    for (const [key, value] of Object.entries(TABLETS_REG)) {
      if (value instanceof RegExp) {
        if (isPlatformBrowser(this.platformId) && this.isTouch() && (value.test(window.navigator.userAgent) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))) {
          tablet = true;
          break;
        }
      }
    }
    return tablet;
  }

  isTouch(): boolean {
    const hasTouch = () =>
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof Document);
    const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
    if (hasTouch || supportsTouch > 0) {
      return true;
    } else {
      return false;
    }
  }

    /**
   * @author Kalender Hisir
   * @desc Gets the initial value of the device when the service is initiated.
   * This value|function is later accessible for usage
   */
  getDeviceInfo(): DeviceInfo {
    let di: DeviceInfo = new DeviceInfo();
    try {
      di.Os = this.getOs();
      di.OsVersion = this.getOsVersion();
      di.Browser = this.getBrowser();
      di.BrowserVersion = this.getBrowserVersion();
      di.Device = this.getDevice();
      di.Orientation = this.getOrientation();
      di.IsMobie = this.isMobile();
      di.IsDesktop = this.isDesktop();
      di.IsTouch = this.isTouch();
      di.IsTablet = this.isTablet();
    } catch (error) {
      console.error(error);
    }

    return di;
  }

  getUserAgent(): string {
    return navigator.userAgent;
  }

  getOs(): string {
    let os: string = this.UNKNOWN;
    for (const [key, value] of Object.entries(OS_REG)) {
      if (value instanceof RegExp) {
        if (value.test(window.navigator.userAgent)) {
          os = OS[key];
          break;
        }
      }
    }
    return os;
  }

  getOsVersion(): string {
    let osVer: string = this.UNKNOWN;
    for (const [key, value] of Object.entries(OS_VERSIONS_REG)) {
      if (value instanceof RegExp) {
        if (value.test(window.navigator.userAgent)) {
          osVer = OS_VERSIONS[key];
          break;
        }
      }
    }
    return osVer;
  }

  getDevice(): string {
    let device: string = this.UNKNOWN;
    for (const [key, value] of Object.entries(DEVICES_REG)) {
      if (value instanceof RegExp) {
        if (value.test(window.navigator.userAgent)) {
          device = DEVICES[key];
          break;
        }
      }
    }
    return device;
  }

  getBrowser(): string {
    let browser: string = this.UNKNOWN;
    for (const [key, value] of Object.entries(BROWSERS_REG)) {
      if (value instanceof RegExp) {
        if (value.test(window.navigator.userAgent)) {
          browser = BROWSERS[key];
          break;
        }
      }
    }
    return browser;
  }

  getBrowserVersion(): string {
    let browserVer: any = this.UNKNOWN;
    for (const [key, value] of Object.entries(BROWSER_VERSIONS_REG)) {
      if (value instanceof RegExp) {
        if (value.test(window.navigator.userAgent)) {
          let arr: any = window.navigator.userAgent.match(value);
          browserVer = arr[0];
          break;
        }
      }
    }
    return browserVer;
  }

  getOrientation(): string {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(orientation: landscape)').matches
        ? OrientationType.Landscape
        : OrientationType.Portrait;
    } else {
      return this.UNKNOWN;
    }
  }
}
