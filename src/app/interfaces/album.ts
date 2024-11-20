export interface Album {
    id_album: number;
    title: string;
    artist: string;
    score: number;
    photo: string;
}
  
export interface BestAlbumsResponse {
    best_albums: Album[];
}
  
export interface AlbumDetailsResponse {
    ratingCount: number;
    likes: number;
    listsCreated: number;
    comments: number;
    listens: number;
    name: string;
    id_artist: number;
    artist_name: string;
    photo: string;
    released: string;
    language: string;
}

export interface Album {
    id_album: number;
    title: string;
    photo: string;
    artist: string;
    releaseDate: string;
    // Otros atributos que el álbum pueda tener
  }
  
  export interface WatchListAlbumsResponse {
    watchlist_albums: Album[];  // Usamos la interfaz Album para especificar la estructura de cada álbum
  }