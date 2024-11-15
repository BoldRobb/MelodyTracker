export interface SongDetailsResponse {
    title: string;
    artist_name: string;
    album_cover: string;
    release_date: string;
    language: string;
    listens: number;
    likes: number;
    comments: number;
    ratingCount: number;
  }


export interface WatchListUserResponse {
  watchlist_songs: WatchlistSong[];  // Aquí se asume que `watchlist_songs` es un arreglo de canciones
}

export interface WatchlistSong {
  genre: string;
  id_artist: string;  
  id_song: number;
  language: string;   
  title: string;         
  album: string;         
  photo: string;           
}