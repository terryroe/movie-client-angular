import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

/**
 * The Movie Card component.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * The list of the movies.
   */
  movies: any[] = [];

  /**
   * Create instance of MovieCardComponent.
   * @param fetchApiData Service to make API calls.
   * @param dialog The Material Dialog for displaying info about a single movie.
   * @param snackBar Material Snackbar service to display notifications.
   * @param router Angular Router to navigate to other pages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Life cycle method called after component is initialized.
   */
  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  /**
   * Get all movies via the API and store them in the 'movies' array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Open the material dialog to display Genre detials.
   * @param genre Details about the Genre of the movie to be displayed.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      },
    });
  }

  /**
   * Open the material dialog to display Director detials.
   * @param director Details about the Director of the movie to be displayed.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      },
    });
  }

  /**
   * Open the material dialog to display Synopsis detials.
   * @param synopsis Details about the Synopsis of the movie to be displayed.
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: 'Synopsis',
        content: synopsis,
      },
    });
  }

  /**
   * Determine if a movie is in the user's favorite movies list.
   * @param id The id of a movie to look for in the favorite movies list.
   * @returns True if it's a favorite movie, False otherwise.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Add a movie to the user's favorite movies list.
   * @param id The id of the movie to add to favorite movies.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Added to Favorites.', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Remove a movie from the user's favorite movies list.
   * @param id The id of the movie to remove from favorite movies.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from Favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}
