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
import { TableSkeleton } from '../table-skeleton/table-skeleton';

@Component({
  selector: 'app-table',
  imports: [TableSkeleton],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table<T> {
  loading = input.required<boolean>();
  data = input.required<T[]>();
  columns = input.required<TableColumn<T>[]>();
  pageSizeOptions = input<number[]>([5, 10, 20]);

  edit = output<T>();
  remove = output<T>();
  pageChange = output<{ pageSize: number; pageIndex: number }>();

  pageSize = signal(5);
  pageIndex = signal(0);

  total = computed(() => this.data().length);
  totalPages = computed(() => Math.max(Math.ceil(this.total() / this.pageSize()), 1));
  currentRange = computed(() => {
    const start = this.pageIndex() * this.pageSize() + 1;
    const end = Math.min((this.pageIndex() + 1) * this.pageSize(), this.total());
    return { start, end };
  });
  canPrev = computed(() => this.pageIndex() > 0);
  canNext = computed(() => this.pageIndex() < this.totalPages() - 1);
  openRow = signal<T | null>(null);

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
      this.pageChange.emit({ pageSize: this.pageSize(), pageIndex: this.pageIndex() });
    }
  }

  prevPage() {
    if (this.canPrev()) {
      this.pageIndex.update((i) => i - 1);
      this.pageChange.emit({ pageSize: this.pageSize(), pageIndex: this.pageIndex() });
    }
  }

  toggleMenu(row: T) {
    this.openRow.set(this.openRow() === row ? null : row);
  }
}
