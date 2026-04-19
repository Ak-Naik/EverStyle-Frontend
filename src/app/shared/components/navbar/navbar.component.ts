import {
  Component, inject, HostListener,
  ElementRef, ViewChild, OnDestroy, OnInit
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy {
  private auth   = inject(AuthService);
  private router = inject(Router);

  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('accountWrapper') accountWrapperRef!: ElementRef<HTMLElement>;

  readonly user      = this.auth.user;
  readonly isLoggedIn = this.auth.isLoggedIn;

  isScrolled          = false;
  isMobileMenuOpen    = false;
  isSearchOpen        = false;
  showAccountDropdown = false;
  searchQuery         = '';
  cartCount           = 0;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showAccountDropdown && this.accountWrapperRef &&
        !this.accountWrapperRef.nativeElement.contains(event.target as Node)) {
      this.showAccountDropdown = false;
    }
  }

  toggleAccountDropdown(): void {
    this.showAccountDropdown = !this.showAccountDropdown;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => this.searchInputRef?.nativeElement.focus(), 50);
    }
  }

  closeSearchOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('search-overlay')) {
      this.isSearchOpen = false;
    }
  }

  onSearch(): void {
    const q = this.searchQuery.trim();
    if (q) {
      this.router.navigate(['/products'], { queryParams: { q } });
      this.isSearchOpen = false;
      this.searchQuery = '';
    }
  }

  getInitials(): string {
    const name = this.auth.user()?.name ?? '';
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'U';
  }

  getFirstName(): string {
    return this.auth.user()?.name?.split(' ')[0] || 'Account';
  }

  logout(): void {
    this.auth.logout();
    this.showAccountDropdown = false;
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {}
}