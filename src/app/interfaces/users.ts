export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string; // Ajusta según el rol que manejes, o elimínalo si no aplica.
}