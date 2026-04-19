import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface SendOtpResponse {
  success: boolean;
  message: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    avatarUrl?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthFeatureService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/auth`;

  sendOtp(phoneNumber: string): Observable<SendOtpResponse> {
    return this.http.post<SendOtpResponse>(`${this.base}/send-otp`, { 
      phone_number: phoneNumber 
    });
  }

  verifyOtp(phoneNumber: string, otp: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.base}/verify-otp`, { 
      phone_number: phoneNumber, 
      otp 
    });
  }
}