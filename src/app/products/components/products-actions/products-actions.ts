import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddButton } from '../../../shared/components/add-button/add-button';
import { SearchInput } from '../../../shared/components/search-input/search-input';

@Component({
  selector: 'app-products-actions',
  imports: [SearchInput, AddButton],
  templateUrl: './products-actions.html',
  styleUrl: './products-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsActions {}
