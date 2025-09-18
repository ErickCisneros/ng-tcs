import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Product } from '../core/models/product.model';
import { Table } from '../shared/components/table/table';
import { Container } from '../shared/layout/container/container';
import { TableColumn } from '../shared/types/table-column';
import { ProductsActions } from './components/products-actions/products-actions';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prd-001',
    name: 'Tarjeta Visa Clásica',
    description: 'Tarjeta básica para compras nacionales e internacionales.',
    logo: 'https://cdn-icons-png.flaticon.com/512/196/196578.png',
    date_release: '2024-01-01',
    date_revision: '2025-01-01',
  },
  {
    id: 'prd-002',
    name: 'Tarjeta Mastercard Gold',
    description: 'Tarjeta Gold con beneficios exclusivos en viajes.',
    logo: 'https://cdn-icons-png.flaticon.com/512/196/196561.png',
    date_release: '2024-02-01',
    date_revision: '2025-02-01',
  },
  {
    id: 'prd-003',
    name: 'Cuenta de Ahorros Básica',
    description: 'Cuenta de ahorros sin costo de mantenimiento.',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
    date_release: '2024-03-01',
    date_revision: '2025-03-01',
  },
  {
    id: 'prd-004',
    name: 'Cuenta Corriente Empresarial',
    description: 'Cuenta corriente pensada para negocios pequeños y medianos.',
    logo: 'https://cdn-icons-png.flaticon.com/512/3103/3103446.png',
    date_release: '2024-04-01',
    date_revision: '2025-04-01',
  },
  {
    id: 'prd-005',
    name: 'Seguro de Vida Familiar',
    description: 'Protección integral para toda la familia.',
    logo: 'https://cdn-icons-png.flaticon.com/512/3063/3063189.png',
    date_release: '2024-05-01',
    date_revision: '2025-05-01',
  },
  {
    id: 'prd-006',
    name: 'Bono de Inversión 1 Año',
    description: 'Inversión segura con rentabilidad fija anual.',
    logo: 'https://cdn-icons-png.flaticon.com/512/810/810758.png',
    date_release: '2024-06-01',
    date_revision: '2025-06-01',
  },
  {
    id: 'prd-007',
    name: 'Crédito Vehicular',
    description: 'Financiamiento para compra de vehículo nuevo o usado.',
    logo: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
    date_release: '2024-07-01',
    date_revision: '2025-07-01',
  },
  {
    id: 'prd-008',
    name: 'Crédito Hipotecario',
    description: 'Préstamo a largo plazo para adquisición de vivienda.',
    logo: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
    date_release: '2024-08-01',
    date_revision: '2025-08-01',
  },
  {
    id: 'prd-009',
    name: 'Póliza de Salud Plus',
    description: 'Cobertura médica completa para emergencias y consultas.',
    logo: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
    date_release: '2024-09-01',
    date_revision: '2025-09-01',
  },
  {
    id: 'prd-010',
    name: 'Seguro de Viaje',
    description: 'Protección en viajes nacionales e internacionales.',
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    date_release: '2024-10-01',
    date_revision: '2025-10-01',
  },
  {
    id: 'prd-011',
    name: 'Depósito a Plazo 6 Meses',
    description: 'Producto de inversión a corto plazo.',
    logo: 'https://cdn-icons-png.flaticon.com/512/2303/2303912.png',
    date_release: '2024-11-01',
    date_revision: '2025-11-01',
  },
  {
    id: 'prd-012',
    name: 'Depósito a Plazo 12 Meses',
    description: 'Inversión segura con mayor rentabilidad anual.',
    logo: 'https://cdn-icons-png.flaticon.com/512/2303/2303933.png',
    date_release: '2024-12-01',
    date_revision: '2025-12-01',
  },
  {
    id: 'prd-013',
    name: 'Cuenta Digital',
    description: 'Cuenta 100% en línea sin necesidad de visitar agencias.',
    logo: 'https://cdn-icons-png.flaticon.com/512/1828/1828859.png',
    date_release: '2024-01-15',
    date_revision: '2025-01-15',
  },
  {
    id: 'prd-014',
    name: 'Tarjeta Débito Internacional',
    description: 'Tarjeta de débito aceptada en todo el mundo.',
    logo: 'https://cdn-icons-png.flaticon.com/512/196/196565.png',
    date_release: '2024-02-15',
    date_revision: '2025-02-15',
  },
  {
    id: 'prd-015',
    name: 'Cuenta Premium',
    description: 'Cuenta exclusiva con beneficios preferenciales.',
    logo: 'https://cdn-icons-png.flaticon.com/512/942/942751.png',
    date_release: '2024-03-15',
    date_revision: '2025-03-15',
  },
  {
    id: 'prd-016',
    name: 'Seguro de Auto',
    description: 'Cobertura total contra accidentes y robos.',
    logo: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
    date_release: '2024-04-15',
    date_revision: '2025-04-15',
  },
  {
    id: 'prd-017',
    name: 'Fondo Mutuo Conservador',
    description: 'Inversión diversificada de bajo riesgo.',
    logo: 'https://cdn-icons-png.flaticon.com/512/1997/1997928.png',
    date_release: '2024-05-15',
    date_revision: '2025-05-15',
  },
  {
    id: 'prd-018',
    name: 'Fondo Mutuo Balanceado',
    description: 'Inversión de riesgo medio con retorno estable.',
    logo: 'https://cdn-icons-png.flaticon.com/512/1997/1997945.png',
    date_release: '2024-06-15',
    date_revision: '2025-06-15',
  },
  {
    id: 'prd-019',
    name: 'Fondo Mutuo Agresivo',
    description: 'Inversión de mayor riesgo con altos retornos.',
    logo: 'https://cdn-icons-png.flaticon.com/512/1997/1997963.png',
    date_release: '2024-07-15',
    date_revision: '2025-07-15',
  },
  {
    id: 'prd-020',
    name: 'Seguro de Hogar',
    description: 'Protección contra incendios, robos y daños estructurales.',
    logo: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
    date_release: '2024-08-15',
    date_revision: '2025-08-15',
  },
];

@Component({
  selector: 'app-products',
  imports: [Container, ProductsActions, Table],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  data = signal(MOCK_PRODUCTS);
  columns: TableColumn<Product>[] = [
    { key: 'logo', label: 'Logo', type: 'image' },
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'date_release', label: 'Liberación' },
    { key: 'date_revision', label: 'Revisión' },
  ];
}
