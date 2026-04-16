export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  roles: Role[];
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: number;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface Role {
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
}

export interface UserProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}