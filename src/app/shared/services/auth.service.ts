import { Injectable, inject, signal } from '@angular/core';
import { AuthConfigService } from './auth-config.service';

export interface Credentials {
  username: string;
  password: string;
}

export interface UserProfile {
  username: string;
  email: string;
  password: string;
}

interface StoredAuthState {
  isLogged: boolean;
  profile: UserProfile;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authConfig = inject(AuthConfigService);
  private readonly defaultProfile: UserProfile = this.authConfig.getDefaultProfile();
  private readonly storageKey = 'lemoncode-auth-state';
  private readonly loggedState = signal<boolean>(false);
  private readonly profileState = signal<UserProfile>({ ...this.defaultProfile });

  constructor() {
    this.restoreState();
  }

  login({ username, password }: Credentials): boolean {
    const currentProfile = this.profileState();

    if (username !== currentProfile.email || password !== currentProfile.password) {
      return false;
    }

    this.loggedState.set(true);
    this.persistState();
    return true;
  }

  logout(): void {
    this.loggedState.set(false);
    this.persistState();
  }

  isLogged(): boolean {
    return this.loggedState();
  }

  getUsername(): string {
    return this.profileState().username;
  }

  getProfile(): UserProfile {
    return this.profileState();
  }

  updateProfile(profile: UserProfile): void {
    this.profileState.set({ ...profile });
    this.persistState();
  }

  private restoreState(): void {
    const serializedState = localStorage.getItem(this.storageKey);

    if (!serializedState) {
      return;
    }

    try {
      const parsedState = JSON.parse(serializedState) as StoredAuthState;
      this.loggedState.set(parsedState.isLogged ?? false);
      this.profileState.set({
        username: parsedState.profile?.username ?? this.defaultProfile.username,
        email: parsedState.profile?.email ?? this.defaultProfile.email,
        password: parsedState.profile?.password ?? this.defaultProfile.password,
      });
    } catch {
      localStorage.removeItem(this.storageKey);
      this.loggedState.set(false);
      this.profileState.set({ ...this.defaultProfile });
    }
  }

  private persistState(): void {
    const state: StoredAuthState = {
      isLogged: this.loggedState(),
      profile: this.profileState(),
    };

    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }
}
