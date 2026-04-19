import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private auth    = inject(AuthService);
  private router  = inject(Router);
  private fb      = inject(FormBuilder);

  readonly user        = this.auth.user;
  isSaving             = signal(false);
  saveSuccess          = signal(false);
  activeSection        = signal<'profile' | 'orders' | 'addresses' | 'wishlist'>('profile');

  form = this.fb.group({
    name:  ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email]]
  });

  ngOnInit(): void {
    const u = this.auth.user();
    if (!u) { this.router.navigate(['/auth/login']); return; }
    this.form.patchValue({ name: u.name, email: u.email });
  }

  getInitials(): string {
    const name = this.auth.user()?.name ?? '';
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'U';
  }

  saveProfile(): void {
    if (this.form.invalid) return;
    this.isSaving.set(true);
    this.saveSuccess.set(false);
    setTimeout(() => {
      const current = this.auth.user()!;
      const updated: User = {
        ...current,
        name:  this.form.value.name  ?? current.name,
        email: this.form.value.email ?? current.email
      };
      this.auth.updateUser(updated);
      this.isSaving.set(false);
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3000);
    }, 800);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}