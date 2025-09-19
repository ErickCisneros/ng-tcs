import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductMessages } from '../core/enums';
import { ProductModel } from '../core/models/product.model';
import { AddButton } from '../shared/components/add-button/add-button';
import { SearchInput } from '../shared/components/search-input/search-input';
import { Table } from '../shared/components/table/table';
import { Container } from '../shared/layout/container/container';
import { Dialog } from '../shared/services/dialog';
import { Snackbar } from '../shared/services/snackbar';
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
  private router = inject(Router);
  private productsHttp = inject(ProductsHttp);
  private dialog = inject(Dialog);
  private snackbar = inject(Snackbar);
  private allProducts = signal<ProductModel[]>([]);

  loadingProducts = signal(true);
  products = signal<ProductModel[]>([]);
  columns: TableColumn<ProductModel>[] = [
    { key: 'logo', label: 'Logo', type: 'image' },
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'date_release', label: 'Liberación' },
    { key: 'date_revision', label: 'Revisión' },
  ];

  constructor() {
    afterNextRender(() => {
      this.loadProducts();
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

  onEdit(product: ProductModel) {
    this.router.navigate(['/products', product.id]);
  }

  async onRemove(product: ProductModel) {
    const confirm = await this.dialog.confirm({
      title: 'Eliminar producto',
      message: `¿Seguro que deseas eliminar ${product.name}?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    });

    if (confirm) {
      this.productsHttp.delete(product.id).subscribe({
        next: () => {
          this.loadProducts();
          this.snackbar.show(ProductMessages.DELETE);
        },
        error: () => {
          this.snackbar.show(ProductMessages.DELETE_ERROR);
        },
      });
    }
  }

  private loadProducts() {
    this.productsHttp.getAll().subscribe({
      next: (data) => {
        this.allProducts.set(data);
        this.products.set(data);
        this.loadingProducts.set(false);
      },
      error: () => {
        this.snackbar.show(ProductMessages.LOAD_ERROR);
        this.loadingProducts.set(false);
      },
    });
  }
}
