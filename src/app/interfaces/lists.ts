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

  export interface ListDetailsResponse {
    id_user_creator: number;
    creator_username: string;
    creator_photo: string | null; // Puede ser null si el usuario no tiene foto
    id_list: number;
    list_name: string;
    list_photo: string;
    comment: string;
  }