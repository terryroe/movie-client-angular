import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * The Navbar component.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  /**
   * Create instance of NavbarComponent.
   * @param router Angular Router to navigate to other pages.
   */
  constructor(public router: Router) {}

  /**
   * Log out the user, clear localStorage, and go to the 'welcome' page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
