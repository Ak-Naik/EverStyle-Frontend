export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: AuthUser
}

export interface AuthUser {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    isActive: boolean;
  };
}

export interface OtpRequest {
  mobile: string;
}

export interface OtpVerifyRequest {
  mobile: string;
  otp: string;
}