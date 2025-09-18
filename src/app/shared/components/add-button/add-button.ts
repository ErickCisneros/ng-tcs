import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-button',
  imports: [],
  templateUrl: './add-button.html',
  styleUrl: './add-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButton {}
