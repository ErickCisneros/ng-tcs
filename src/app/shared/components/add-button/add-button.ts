import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-button',
  imports: [RouterLink],
  templateUrl: './add-button.html',
  styleUrl: './add-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButton {}
