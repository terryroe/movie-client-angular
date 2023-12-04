import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  _id?: string;
  Username?: string;
  Password?: string;
  Email?: string;
  FavoriteMovies?: [];
};

/**
 * The User Profile component.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * The user.
   */
  user: User = {};

  /**
   * Input data for the user's profile.
   */
  @Input() userData = { Username: '', Password: '', Email: '' };

  /**
   * Create instance of UserProfileComponent.
   * @param fetchApiData Service to make API calls.
   * @param snackBar Material Snackbar service to display notifications.
   * @param router Angular Router to navigate to other pages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Life cycle method called after component is initialized.
   */
  ngOnInit(): void {
    const user = this.getUser();
    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || '',
      Email: user.Email || '',
      Password: '',
    };
  }

  /**
   * Get the user's info from local storage.
   * @returns User
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Update the user's profile information on the back end.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
      this.user = response;
      this.snackBar.open('User updated.', 'OK', { duration: 2000 });
    });
  }

  /**
   * Delete the user's account.
   * @returns void
   */
  deleteUser(): void {
    if (!confirm('Are you sure you want to delete your user account?')) {
      return;
    }

    this.fetchApiData.deleteUser().subscribe((response) => {
      localStorage.clear();

      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account.',
          'OK',
          {
            duration: 2000,
          }
        );
      });
    });
  }
}
