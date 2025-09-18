import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from './table';

describe('Table', () => {
  let component: Table<unknown>;
  let fixture: ComponentFixture<Table<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
