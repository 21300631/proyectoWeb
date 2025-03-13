

import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { Producto } from '../../models/producto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-inventario',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],

})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { id: 0, nombre: '', precioP: 0, imagen: '' };

  constructor(private inventarioService: InventarioService) {}
  

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.inventarioService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarProducto(): void {
    if (this.nuevoProducto.nombre && this.nuevoProducto.precioP) {
      this.inventarioService.agregarProducto(this.nuevoProducto);
      this.nuevoProducto = { id: 0, nombre: '', precioP: 0, imagen: '' }; // Reiniciar el formulario
      this.obtenerProductos(); // Actualizar la lista de productos
    }
  }

  modificarProducto(id: number): void {
    const productoActualizado = this.productos.find(p => p.id === id);
    if (productoActualizado) {
      this.inventarioService.modificarProducto(id, productoActualizado);
      this.obtenerProductos(); // Actualizar la lista de productos
    }
  }

  eliminarProducto(id: number): void {
    this.inventarioService.eliminarProducto(id);
    this.obtenerProductos(); // Actualizar la lista de productos
  }
}
