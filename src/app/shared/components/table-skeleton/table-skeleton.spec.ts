import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSkeleton } from './table-skeleton';

describe('TableSkeleton', () => {
  let component: TableSkeleton<unknown>;
  let fixture: ComponentFixture<TableSkeleton<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
