import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { RouterOutlet } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private productos:Producto[]=[
    new Producto(1, 'Laptop', 1200, 'assets/laptop.jpg'),
    new Producto(2, 'Smartphone', 800, 'assets/smartphone.jpg'),
    new Producto(3, 'Tablet', 600, 'assets/tablet.jpg')
  ];
  obtenerProductos():Producto[]{
    return this.productos;
  }

  constructor() { }
}
