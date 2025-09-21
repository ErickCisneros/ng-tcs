import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  imports: [CdkMenu, CdkMenuItem, CdkMenuTrigger],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenu<T> {
  row = input.required<T>();

  edit = output<T>();
  remove = output<T>();
}
