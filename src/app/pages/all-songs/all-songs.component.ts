import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song/backend/song.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-songs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css'],
})
export class AllSongsComponent implements OnInit {
  allSongs: any[] = []; // Stores loaded songs
  currentPage: number = 1; // Current page for pagination
  pageSize: number = 28; // Page size (32 songs per page)
  loading: boolean = false; // Loading indicator
  totalSongs: number = 0; // Total number of songs

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.loadSongs(); // Load first songs on initialization
  }

  loadSongs() {
    if (this.loading) return; // Prevent duplicate requests
    this.loading = true;

    this.songService.getAllSongs().subscribe(
      (songs) => {
        // Update total songs count
        this.totalSongs = songs.length;

        // Calculate start and end indices for the current page
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = this.currentPage * this.pageSize;

        // Get songs for the current page
        const newSongs = songs.slice(startIndex, endIndex);

        // Add new songs to the existing array
        this.allSongs.push(...newSongs);

        // Increment page number
        this.currentPage++;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading songs:', error);
        this.loading = false;
      }
    );
  }

  // Method to check if all songs have been loaded
  get allSongsLoaded(): boolean {
    return this.allSongs.length >= this.totalSongs;
  }
}