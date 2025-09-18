import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Product } from '../core/models/product';
import { AddButton } from '../shared/components/add-button/add-button';
import { SearchInput } from '../shared/components/search-input/search-input';
import { Table } from '../shared/components/table/table';
import { Container } from '../shared/layout/container/container';
import { TableColumn } from '../shared/types/table-column';
import { ProductsHttp } from './services/products-http';

@Component({
  selector: 'app-products',
  imports: [Container, Table, SearchInput, AddButton],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  private productsHttp = inject(ProductsHttp);
  private allProducts = signal<Product[]>([]);

  products = signal<Product[]>([]);
  columns: TableColumn<Product>[] = [
    { key: 'logo', label: 'Logo', type: 'image' },
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'date_release', label: 'Liberación' },
    { key: 'date_revision', label: 'Revisión' },
  ];

  constructor() {
    this.productsHttp.getAll().subscribe({
      next: (data) => {
        this.allProducts.set(data);
        this.products.set(data);
      },
      error: (err) => console.error('Error al obtener productos:', err),
    });
  }

  onSearch(term: string) {
    const lower = term.toLowerCase();
    this.products.set(
      this.allProducts().filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.id.toLowerCase().includes(lower),
      ),
    );
  }
}
