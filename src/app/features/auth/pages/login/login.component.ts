import { Component, inject, signal, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthFeatureService } from '../../services/auth-feature.service';
import { OtpInputComponent } from '../../components/otp-input/otp-input.component';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, OtpInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private auth        = inject(AuthService);
  private authFeature = inject(AuthFeatureService);
  private router      = inject(Router);
  private route       = inject(ActivatedRoute);

  @ViewChild(OtpInputComponent) otpInput?: OtpInputComponent;

  step         = signal<'phone' | 'otp'>('phone');
  phone        = signal('');
  otp          = signal('');
  isLoading    = signal(false);
  errorMsg     = signal('');
  countdown    = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  // ── Step 1: Request OTP ──
  requestOtp(): void {
    const p = this.phone().trim();
    if (!/^[6-9]\d{9}$/.test(p)) {
      this.errorMsg.set('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    this.errorMsg.set('');
    this.isLoading.set(true);
    this.authFeature.sendOtp(p).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.step.set('otp');
        this.startCountdown(30);
        /* eslint-disable-next-line no-console */
        console.log(`[EverStyle Demo] OTP for ${p}: ${res.otp}`);
        setTimeout(() => this.otpInput?.focusFirst(), 80);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err?.error?.detail ?? 'Failed to send OTP. Please try again.');
      },
    });
  }

  // ── Step 2: Verify OTP ──
  verifyOtp(): void {
    if (this.otp().length !== 4) {
      this.errorMsg.set('Please enter the complete 4-digit OTP.');
      return;
    }
    this.errorMsg.set('');
    this.isLoading.set(true);
    this.authFeature.verifyOtp(this.phone().trim(), this.otp()).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        const user: User = {
          id: Date.now(),
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone_number,
          avatarUrl: res.user.avatarUrl ?? '',
          role: [{ role: 'user', permissions: [], isActive: true }],
          addresses: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.auth.storeSession(res.token, user);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err?.error?.detail ?? 'Incorrect OTP. Please try again or resend.');
        this.otpInput?.reset();
      },
    });
  }

  // ── Helpers ──
  onOtpChange(val: string): void {
    this.otp.set(val);
  }

  resendOtp(): void {
    if (this.countdown() > 0) return;
    this.errorMsg.set('');
    this.otp.set('');
    this.otpInput?.reset();
    this.requestOtp();
  }

  goBack(): void {
    this.step.set('phone');
    this.otp.set('');
    this.errorMsg.set('');
    clearInterval(this.timer);
    this.countdown.set(0);
  }

  private startCountdown(secs: number): void {
    clearInterval(this.timer);
    this.countdown.set(secs);
    this.timer = setInterval(() => {
      if (this.countdown() > 0) {
        this.countdown.update(v => v - 1);
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}