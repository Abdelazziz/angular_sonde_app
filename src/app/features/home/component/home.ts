import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentYear: number = new Date().getFullYear();

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
