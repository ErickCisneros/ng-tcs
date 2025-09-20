import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-error-messages',
  imports: [],
  templateUrl: './input-error-messages.html',
  styleUrl: './input-error-messages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorMessages implements OnInit, OnDestroy {
  @Input({ required: true }) fc!: AbstractControl | null;

  private cdr = inject(ChangeDetectorRef);
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(this.fc?.statusChanges.subscribe(() => this.cdr.markForCheck()));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
