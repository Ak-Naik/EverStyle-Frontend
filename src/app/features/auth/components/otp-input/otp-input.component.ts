import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ViewChildren, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [],
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css'],
})
export class OtpInputComponent implements OnInit {
  @Input() length = 6;
  @Output() otpComplete = new EventEmitter<string>();
  @Output() otpChange = new EventEmitter<string>();
  @ViewChildren('otpBox') boxes!: QueryList<ElementRef<HTMLInputElement>>;

  digits: string[] = []
  private backspaceActive = false

  ngOnInit(): void {
    this.digits = Array(this.length).fill('');
  }

  getBoxIndices(): number[] {
    return Array.from({ length: this.length }, (_, i) => i);
  }

  onInput(event: Event, index: number): void {
    if (this.backspaceActive) return
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.digits[index] = val;
    input.value = val;
    if (val && index < this.length - 1) {
      this.focusBox(index + 1);
    }
    this.emit();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    // console.log(`[OTP] keydown: key="${event.key}", index=${index}, currentDigit="${this.digits[index]}"`)
    if (event.key === 'Backspace' ) {
      this.backspaceActive = true;
      event.preventDefault();

      if (!this.digits[index] && index > 0) {
        this.digits[index - 1] = '';
        this.emit();
        setTimeout(() => {
          const ba = this.boxes?.toArray();
          if (ba?.[index - 1]) ba[index  -1].nativeElement.value = '';
          this.focusBox(index - 1);
          this.backspaceActive = false;
        });
      } else {
        this.digits[index] = '';
        (event.target as HTMLInputElement).value = '';
        this.emit();
        setTimeout(() => {
          if (index > 0) this.focusBox(index - 1);
          this.backspaceActive = false
        })
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, this.length);
    pasted.split('').forEach((c, i) => { this.digits[i] = c; });
    const last = Math.min(pasted.length - 1, this.length - 1);
    setTimeout(() => {
      this.focusBox(last);
      this.emit();
    });
  }

  focusFirst(): void {
    setTimeout(() => this.focusBox(0), 50);
  }

  reset(): void {
    this.digits = Array(this.length).fill('');
    this.focusBox(0)
    this.emit();
  }

  private focusBox(index: number): void {
    const ba = this.boxes.toArray();
    if (ba) ba[index]?.nativeElement.focus();
  }

  private emit(): void {
    const otp = this.digits.join('');
    this.otpChange.emit(otp);
    if (otp.length === this.length && !this.digits.includes('')) {
      this.otpComplete.emit(otp);
    }
  }
}
