export interface LoginRequest {
  loginType: string;
  username: string;
  password: string;
  appId: string;
  appVersion: string;
}

export interface LoginResponse {
  token?: string;
  user?: any;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface DocumentResponse {
  documentUrl: string;
}