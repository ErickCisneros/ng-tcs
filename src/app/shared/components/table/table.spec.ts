import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableColumn } from '../../types/table-column';
import { Table } from './table';

interface MockRow {
  id: number;
  name: string;
}

describe('Table', () => {
  let component: Table<MockRow>;
  let fixture: ComponentFixture<Table<MockRow>>;

  const mockData: MockRow[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Row ${i + 1}`,
  }));

  const mockColumns: TableColumn<MockRow>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
    }).compileComponents();

    fixture = TestBed.createComponent(Table<MockRow>);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('columns', mockColumns);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total and totalPages correctly', () => {
    expect(component.total()).toBe(12);
    expect(component.totalPages()).toBe(3);
  });

  it('should return correct currentRange', () => {
    expect(component.currentRange()).toEqual({ start: 1, end: 5 });

    component.pageIndex.set(2);
    expect(component.currentRange()).toEqual({ start: 11, end: 12 });
  });

  it('should paginate data', () => {
    expect(component.paginatedData().length).toBe(5);

    component.pageIndex.set(2);
    expect(component.paginatedData().length).toBe(2);
  });

  it('should reset pageIndex on page size change and emit event', () => {
    const spy = jest.spyOn(component.pageChange, 'emit');
    const event = { target: { value: '10' } } as unknown as Event;

    component.onPageSizeChange(event);

    expect(component.pageSize()).toBe(10);
    expect(component.pageIndex()).toBe(0);
    expect(spy).toHaveBeenCalledWith({ pageSize: 10, pageIndex: 0 });
  });

  it('should go to next and previous pages and emit events', () => {
    const spy = jest.spyOn(component.pageChange, 'emit');

    component.nextPage();
    expect(component.pageIndex()).toBe(1);
    expect(spy).toHaveBeenCalledWith({ pageSize: 5, pageIndex: 1 });

    component.prevPage();
    expect(component.pageIndex()).toBe(0);
    expect(spy).toHaveBeenCalledWith({ pageSize: 5, pageIndex: 0 });
  });

  it('should not go next when on last page', () => {
    component.pageIndex.set(component.totalPages() - 1);
    const spy = jest.spyOn(component.pageChange, 'emit');

    component.nextPage();

    expect(component.pageIndex()).toBe(component.totalPages() - 1);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not go prev when on first page', () => {
    component.pageIndex.set(0);
    const spy = jest.spyOn(component.pageChange, 'emit');

    component.prevPage();

    expect(component.pageIndex()).toBe(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should clamp pageIndex if it exceeds totalPages', () => {
    component.pageIndex.set(10); // way out of range
    fixture.detectChanges();

    expect(component.pageIndex()).toBe(component.totalPages() - 1);
  });
});
