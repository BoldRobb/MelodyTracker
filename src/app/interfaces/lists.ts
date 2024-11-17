// Interfaz para la solicitud de crear lista
export interface ListCreateRequest {
    user_id: any;
    name: string;
    comment: string;
    photo: string;
  }
  
  // Interfaz para la respuesta de crear lista
  export interface ListCreateResponse {
    detail: string;
    list_id: number;
  }