import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductMessages } from '../../../core/enums';
import { ProductModel } from '../../../core/models/product.model';
import { releaseDateValidator } from '../../../core/validators/release-date.validator';
import { uniqueIdValidator } from '../../../core/validators/unique-id.validator';
import { InputErrorMessages } from '../../../shared/components/input-error-messages/input-error-messages';
import { Container } from '../../../shared/layout/container/container';
import { Dialog } from '../../../shared/services/dialog';
import { Snackbar } from '../../../shared/services/snackbar';
import { ProductsHttp } from '../../services/products-http';

@Component({
  selector: 'app-product',
  imports: [Container, ReactiveFormsModule, InputErrorMessages],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Product implements OnInit {
  readonly productId = input.required<string>();

  private fb = inject(NonNullableFormBuilder);
  private productsHttp = inject(ProductsHttp);
  private dialog = inject(Dialog);
  private snackbar = inject(Snackbar);
  private router = inject(Router);

  form = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]],
    date_release: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), releaseDateValidator()],
    ],
    date_revision: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
    ],
  });

  isEdit = signal(false);

  ngOnInit(): void {
    if (this.productId() && this.productId() !== 'create-product') {
      this.isEdit.set(true);
      this.loadProduct(this.productId());
    } else {
      this.form.controls.id.addAsyncValidators(uniqueIdValidator(this.productsHttp));
    }

    this.setDates();
  }

  private loadProduct(id: string) {
    this.productsHttp.get(id).subscribe({
      next: (product: ProductModel) => {
        this.form.patchValue(product);
        this.form.get('id')?.disable();
      },
      error: () => this.snackbar.show(ProductMessages.LOAD_ERROR),
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const formValue: ProductModel = {
      ...(this.form.getRawValue() as ProductModel),
    };

    if (this.isEdit()) {
      const confirm = await this.dialog.confirm({
        title: 'Actualizar producto',
        message: `¿Deseas actualizar el producto con ID: ${this.productId()}?`,
        confirmText: 'Actualizar',
        cancelText: 'Cancelar',
      });

      if (confirm) {
        this.productsHttp.update(formValue.id, formValue).subscribe({
          next: () => {
            this.snackbar.show(ProductMessages.UPDATE);
            this.router.navigate(['/products']);
          },
          error: () => this.snackbar.show(ProductMessages.UPDATE_ERROR),
        });
      }
    } else {
      this.productsHttp.create(formValue).subscribe({
        next: () => {
          this.snackbar.show(ProductMessages.CREATE);
          this.router.navigate(['/products']);
        },
        error: () => this.snackbar.show(ProductMessages.CREATE_ERROR),
      });
    }
  }

  private setDates() {
    this.form.controls.date_release.valueChanges.subscribe((value) => {
      if (value) {
        const release = new Date(value);
        const revision = new Date(release);
        revision.setFullYear(release.getFullYear() + 1);

        this.form.controls.date_revision.setValue(revision.toISOString().split('T')[0], {
          emitEvent: false,
        });
      }
    });
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
