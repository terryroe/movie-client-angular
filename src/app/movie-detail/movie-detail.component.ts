import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The Movie Detail component.
 */
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  /**
   * Create instance of MovieDetailComponent.
   * @param data The movie title and the movie description.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string }
  ) {}

  /**
   * Life cycle method called after component is initialized.
   */
  ngOnInit(): void {}
}
