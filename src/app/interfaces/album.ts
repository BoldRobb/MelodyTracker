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