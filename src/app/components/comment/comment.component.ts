import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service';
import { AlbumService } from '../../services/album/backend/album-service.service'; // Servicio para los álbumes
import { ListsService } from '../../services/lists/backend/lists.service'; // Servicio para las listas
import { SpinnerService } from '../../services/others/spinner.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  isLoading = true;
  userId: number | undefined;
  id_user: number | undefined;
  isAlbum: boolean = false;
  isSong: boolean = false;
  isList: boolean = false;

  id_url = this.getIdFromUrl();


  showDeleteConfirmation: boolean = false;  // Variable para mostrar el modal
  commentToDelete: any = null;  // Variable para almacenar el comentario que se va a eliminar


  constructor(
    private songService: SongService,
    private albumService: AlbumService,
    private spinnerService: SpinnerService,
    private router: Router,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private listsService: ListsService
  ) {}

  ngOnInit() {
    this.id_user = this.getUserIdFromToken();
    this.albumService.commentUpdated$.subscribe(() => {
      this.loadComments();
    });

    this.checkIfAlbumSongList();
    this.loadComments(); // Cargar los comentarios inicialmente

  }

  getUserIdFromToken(): number | undefined {
    const token = localStorage.getItem('access_token');
    if (!token) {

      return undefined;
    }

    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    return payloadObj?.id_user;
  }

  checkIfAlbumSongList() {
    const url = window.location.pathname;
    this.isAlbum = url.includes('/album/');
    this.isSong = url.includes('/song/');
    this.isList = url.includes('/list/');
  }

  loadComments() {
    const id = this.getIdFromUrl();
    if (this.isAlbum) {
      this.albumService.getAlbumComments(id).subscribe(
        (comments) => this.handleComments(comments),
        (error) => this.handleError(error)
      );
    } else if (this.isSong) {
      this.songService.getComments(id).subscribe(
        (comments) => this.handleComments(comments),
        (error) => this.handleError(error)
      );
    } else if (this.isList) {
      this.listsService.getListComments(id).subscribe(
        (comments) => this.handleComments(comments),
        (error) => this.handleError(error)
      );
    }
  }

  handleComments(comments: any[]) {
    if (Array.isArray(comments) && comments.length > 0) {
      this.comments = comments;
      this.userId = comments[0].id_user;
      this.checkLikesForComments();
    } else {

    }
    this.isLoading = false;
  }

  handleError(error: any) {

    this.isLoading = false;
  }

  getIdFromUrl(): number {
    const urlParts = window.location.pathname.split('/');
    return +urlParts[urlParts.length - 1];
  }

  getStars(score: number): number[] {
    score = Number(score);
    const fullStars = Math.floor(score);
    const halfStars = score % 1 >= 0.5 ? 1 : 0;
    return [
      ...new Array(fullStars).fill(1),
      ...new Array(halfStars).fill(0.5),
    ];
  }

  navigateToProfile(userId: number): void {
    if (userId) {
      this.router.navigate(['/profile', userId]);
    } else {

    }
  }

  // Verificar si el usuario ha dado like a cada comentario (para canciones, álbumes o listas)
  checkLikesForComments() {
    if (this.id_user !== undefined) {
      this.comments.forEach((comment) => {
        if (this.isSong) {
          this.songService
            .hasLikedReview(this.id_user!, comment.id_reviewed_songs)
            .pipe(finalize(() => this.spinnerService.hide()))
            .subscribe({
              next: (response) => {
                comment.isLiked = response.has_liked;
                this.getLikesCountForComment(comment, 'song');
              },
              error: (error) => {
                comment.isLiked = false;
              },
            });
        } else if (this.isAlbum) {
          this.albumService
            .hasLikedReviewAlbum(this.id_user!, comment.id_reviewed_albums)
            .pipe(finalize(() => this.spinnerService.hide()))
            .subscribe({
              next: (response) => {
                comment.isLiked = response.has_liked;
                this.getLikesCountForComment(comment, 'album');
              },
              error: (error) => {
                comment.isLiked = false;
              },
            });
        } else if (this.isList) {
          this.listsService
            .hasLikedReviewList(this.id_user!, comment.id_reviewed_lists)
            .pipe(finalize(() => this.spinnerService.hide()))
            .subscribe({
              next: (response) => {
                comment.isLiked = response.has_liked;
                this.getLikesCountForComment(comment, 'list');
              },
              error: (error) => {
                comment.isLiked = false;
              },
            });
        }
      });
    }
  }

  // Obtener el número de likes para un comentario específico (canción, álbum o lista)
  getLikesCountForComment(comment: any, type: 'song' | 'album' | 'list') {
    const getLikesCount$ =
      type === 'song'
        ? this.songService.getLikesCount(comment.id_reviewed_songs)
        : type === 'album'
        ? this.albumService.getLikesCountAlbum(comment.id_reviewed_albums)
        : this.listsService.getLikesCountList(comment.id_reviewed_lists);

    getLikesCount$.subscribe({
      next: (response) => {
        comment.likesCount = response.likes_count;
      },
      error: () => {
        comment.likesCount = 0;
      },
    });
  }

  // Alternar el like para un comentario (canción, álbum o lista)
  toggleLike(comment: any): void {
    if (this.id_user) {
      let like$;
      if (this.isSong) {
        like$ = comment.isLiked
          ? this.songService.unlikeReview(this.id_user!, comment.id_reviewed_songs)
          : this.songService.likeReview(this.id_user!, comment.id_reviewed_songs);
      } else if (this.isAlbum) {
        like$ = comment.isLiked
          ? this.albumService.unlikeReviewAlbum(this.id_user!, comment.id_reviewed_albums)
          : this.albumService.likeReviewAlbum(this.id_user!, comment.id_reviewed_albums);
      } else if (this.isList) {
        like$ = comment.isLiked
          ? this.listsService.unlikeReviewList(this.id_user!, comment.id_reviewed_lists)
          : this.listsService.likeReviewList(this.id_user!, comment.id_reviewed_lists);
      }

      if (like$) {
        this.spinnerService.show();
        like$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
          next: (response) => {
            comment.isLiked = !comment.isLiked;
            comment.likesCount = comment.isLiked ? comment.likesCount + 1 : comment.likesCount - 1;

          },
          error: (error) => {

          },
        });
      }
    }
  }


  deleteReview(comment: any): void {
    if (!comment || !this.id_user) {

      return;
    }
  
    // Guardamos el comentario a eliminar para usarlo después
    this.commentToDelete = comment;
  
    // Mostramos el modal de confirmación
    this.showDeleteConfirmation = true;
  }


  confirmDelete(): void {
    if (this.commentToDelete) {
      let delete$: Observable<{ msg: string } | { message: string }> | null = null;
  
      if (this.isSong) {
        delete$ = this.songService.deleteReviewSong(this.commentToDelete.id_reviewed_songs);
      } else if (this.isAlbum) {
        delete$ = this.albumService.deleteReviewAlbum(this.commentToDelete.id_reviewed_albums);
      } else if (this.isList) {
        delete$ = this.listsService.deleteReviewList(this.commentToDelete.id_reviewed_lists);
      }
  
      if (delete$ !== null) {
        this.spinnerService.show(); // Mostrar spinner de carga
  
        delete$.pipe(
          finalize(() => {
            this.spinnerService.hide(); // Ocultar spinner al finalizar (éxito o error)
            this.showDeleteConfirmation = false;
          })
        ).subscribe({
          next: (response) => {
            // Usar type guard para determinar qué propiedad existe
            const message = 'msg' in response ? response.msg : response.message;

            this.toast.success('Review deleted successfully');
            // Eliminar el comentario de la lista
            this.comments = this.comments.filter(c => c !== this.commentToDelete);
            
            // Opcional: mostrar una notificación al usuario
            // this.notificationService.success('Comentario eliminado');

          },
          error: (error) => {

            // Opcional: mostrar un mensaje de error al usuario
            // this.notificationService.error('No se pudo eliminar el comentario');
          },
          complete: () => {
            this.commentToDelete = null; // Limpiar la referencia
          }
        });
      }
    }
  }
  
  cancelDelete(): void {
    // Solo cerrar el modal si el usuario cancela
    this.showDeleteConfirmation = false;
    this.commentToDelete = null; // Limpiar la referencia
  }
  
  
  
}
