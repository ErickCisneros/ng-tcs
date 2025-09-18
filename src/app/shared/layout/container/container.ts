import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-container',
  imports: [Logo, Footer],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class Container {}
