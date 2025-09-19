import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-snackbar',
  imports: [],
  templateUrl: './message-snackbar.html',
  styleUrl: './message-snackbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageSnackbar {
  @Input() message = '';
  visible = false;

  show() {
    this.visible = true;
    setTimeout(() => (this.visible = false), 3000);
  }
}
