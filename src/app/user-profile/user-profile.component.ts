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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User = {};

  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

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

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
      this.user = response;
      this.snackBar.open('User updated.', 'OK', { duration: 2000 });
    });
  }

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
