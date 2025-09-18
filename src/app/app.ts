import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Container } from './shared/layout/container/container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Container],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
