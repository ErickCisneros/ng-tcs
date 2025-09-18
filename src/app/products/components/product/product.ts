import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Container } from '../../../shared/layout/container/container';

@Component({
  selector: 'app-product',
  imports: [Container],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Product {}
