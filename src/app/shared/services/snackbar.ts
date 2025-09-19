import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { MessageSnackbar } from '../components/message-snackbar/message-snackbar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  show(message: string, duration = 3000) {
    const snackRef = createComponent(MessageSnackbar, {
      environmentInjector: this.injector,
    });

    snackRef.instance.message = message;

    this.appRef.attachView(snackRef.hostView);
    document.body.appendChild(snackRef.location.nativeElement);

    snackRef.instance.show();

    setTimeout(() => {
      this.appRef.detachView(snackRef.hostView);
      snackRef.destroy();
    }, duration);
  }
}
