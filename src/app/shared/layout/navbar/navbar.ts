import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddButton } from '../../components/add-button/add-button';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-navbar',
  imports: [SearchInput, AddButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {}
