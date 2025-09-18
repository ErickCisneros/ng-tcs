import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Logo } from '../logo/logo';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-container',
  imports: [Logo, Navbar, Footer],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class Container {}
