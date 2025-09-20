import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenu<T> {
  row = input.required<T>();
  isOpen = input(false);
  dropUp = input(false);

  menuToggle = output<void>();
  edit = output<T>();
  remove = output<T>();
}
