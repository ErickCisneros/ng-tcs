import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableColumn } from '../../types/table-column';

@Component({
  selector: 'app-table-skeleton',
  imports: [],
  templateUrl: './table-skeleton.html',
  styleUrl: './table-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeleton<T> {
  columns = input<TableColumn<T>[]>([]);
  rows = input(5);
}
