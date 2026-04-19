import { Injectable, signal, computed, Signal } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

const TOKEN_KEY = 'es_token';
const USER_KEY = 'es_user';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  readonly user: Signal<User | null> = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user());

  constructor(private storage: StorageService) {
    this._user.set(this.loadUser())
  }

  private loadUser(): User | null {
    const raw = this.storage.get(USER_KEY);
    return raw ? JSON.parse(raw) as User : null;
  }

  storeSession(token: string, user: User): void {
    this.storage.set(TOKEN_KEY, token);
    this.storage.set(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  updateUser(user: User): void {
    this.storage.set(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
    this.storage.remove(USER_KEY);
    this._user.set(null);
  }

  getToken(): string | null {
    return this.storage.get(TOKEN_KEY);
  }  
}
