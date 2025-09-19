import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../../core/models/product.model';
import { uniqueIdValidator } from '../../../core/validators/unique-id.validator';
import { Container } from '../../../shared/layout/container/container';
import { ProductsHttp } from '../../services/products-http';

@Component({
  selector: 'app-product',
  imports: [Container, ReactiveFormsModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Product implements OnInit {
  readonly productId = input.required<string>();

  private fb = inject(FormBuilder);
  private productsHttp = inject(ProductsHttp);

  form = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: ['', Validators.required],
  });

  isEdit = signal(false);

  ngOnInit(): void {
    if (this.productId() && this.productId() !== 'create-product') {
      this.isEdit.set(true);
      this.loadProduct(this.productId());
    } else {
      this.form.controls.id.addAsyncValidators(uniqueIdValidator(this.productsHttp));
    }
  }

  private loadProduct(id: string) {
    this.productsHttp.get(id).subscribe({
      next: (product: ProductModel) => {
        this.form.patchValue(product);
        this.form.get('id')?.disable();
      },
      error: (err) => console.error('Error al cargar producto:', err),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue: ProductModel = {
      ...(this.form.getRawValue() as ProductModel),
    };

    if (this.isEdit()) {
      this.productsHttp.update(formValue.id, formValue).subscribe({
        next: () => console.log('Producto actualizado'),
      });
    } else {
      this.productsHttp.create(formValue).subscribe({
        next: () => console.log('Producto creado'),
      });
    }
  }

  onReset() {
    if (this.isEdit()) {
      const id = this.form.controls.id.value;
      this.form.reset({ id });
    } else {
      this.form.reset();
    }
  }
}
