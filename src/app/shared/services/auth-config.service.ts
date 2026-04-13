import { Injectable } from '@angular/core';

export interface AuthDefaultProfile {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  private readonly defaultProfile: AuthDefaultProfile = {
    username: 'master',
    email: 'master@lemoncode.net',
    password: '12345678',
  };
  private readonly loginDelayMs = 2000;

  getDefaultProfile(): AuthDefaultProfile {
    return { ...this.defaultProfile };
  }

  getLoginDelayMs(): number {
    return this.loginDelayMs;
  }
}
