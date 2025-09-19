import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
  @Input() title = 'Confirmación';
  @Input() message = '¿Estás seguro de continuar?';
  @Input() cancelText = 'Cancelar';
  @Input() confirmText = 'Aceptar';

  cancelAction = output();
  confirmAction = output();

  onCancel() {
    this.cancelAction.emit();
  }

  onConfirm() {
    this.confirmAction.emit();
  }
}
