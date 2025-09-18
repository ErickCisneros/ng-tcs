import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { TableColumn } from '../../types/table-column';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table<T> {
  data = input.required<T[]>();
  columns = input.required<TableColumn<T>[]>();
  pageSizeOptions = input<number[]>([5, 10, 20]);

  pageChange = output<{ pageSize: number; pageIndex: number }>();

  pageSize = signal(5);
  pageIndex = signal(0);

  total = computed(() => this.data().length);
  totalPages = computed(() => Math.max(Math.ceil(this.total() / this.pageSize()), 1));
  canPrev = computed(() => this.pageIndex() > 0);
  canNext = computed(() => this.pageIndex() < this.totalPages() - 1);

  clamp = effect(() => {
    const pages = this.totalPages();
    if (this.pageIndex() > pages - 1) {
      this.pageIndex.set(Math.max(pages - 1, 0));
    }
  });

  paginatedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.data().slice(start, start + this.pageSize());
  });

  onPageSizeChange(event: Event) {
    const newSize = +(event.target as HTMLSelectElement).value;
    this.pageSize.set(newSize);
    this.pageIndex.set(0);
    this.pageChange.emit({ pageSize: newSize, pageIndex: 0 });
  }

  nextPage() {
    if (this.canNext()) {
      this.pageIndex.update((i) => i + 1);
      console.log('nextPage →', this.pageIndex());
      this.pageChange.emit({ pageSize: this.pageSize(), pageIndex: this.pageIndex() });
    }
  }

  prevPage() {
    if (this.canPrev()) {
      this.pageIndex.update((i) => i - 1);
      console.log('prevPage →', this.pageIndex());
      this.pageChange.emit({ pageSize: this.pageSize(), pageIndex: this.pageIndex() });
    }
  }
}
