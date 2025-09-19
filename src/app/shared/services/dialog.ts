import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  OutputRefSubscription,
} from '@angular/core';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog';
import { ConfirmDialogData } from '../types/confirm-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class Dialog {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  confirm(data: ConfirmDialogData): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogRef = createComponent(ConfirmDialog, {
        environmentInjector: this.injector,
      });

      dialogRef.instance.title = data.title;
      dialogRef.instance.message = data.message;
      dialogRef.instance.confirmText = data.confirmText;
      dialogRef.instance.cancelText = data.cancelText;

      this.appRef.attachView(dialogRef.hostView);
      document.body.appendChild(dialogRef.location.nativeElement);

      const subCancel = dialogRef.instance.cancelAction.subscribe(() => {
        this.cleanup(dialogRef, subCancel, subConfirm);
        resolve(false);
      });

      const subConfirm = dialogRef.instance.confirmAction.subscribe(() => {
        this.cleanup(dialogRef, subCancel, subConfirm);
        resolve(true);
      });
    });
  }

  private cleanup(dialogRef: ComponentRef<ConfirmDialog>, ...subs: OutputRefSubscription[]) {
    subs.forEach((s) => s.unsubscribe());
    this.appRef.detachView(dialogRef.hostView);
    dialogRef.destroy();
  }
}
