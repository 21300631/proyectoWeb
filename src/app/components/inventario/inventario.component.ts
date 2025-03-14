

import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { Producto } from '../../models/producto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],

})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];


  nuevoProducto: Producto = { id: 0, nombre: '', precioP: 0, imagen: '', cantidad:0}; // Nuevo producto
  productoSeleccionado: Producto | null = null; // Producto seleccionado para editar

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.productos$.subscribe({
      next: (productos) => {
        this.productos = productos;
        console.log('Productos en el componente:', this.productos); 
      },
      error: (error) => {
        console.error('Error al obtener productos:', error); 
      }
    });
  }

  agregarProducto(): void {
    this.inventarioService.agregarProducto(this.nuevoProducto);
    this.nuevoProducto = { id: 0, nombre: '', precioP: 0, imagen: '', cantidad:0}; 
    this.inventarioService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  editarProducto(producto: Producto): void {
    this.productoSeleccionado = { ...producto }; 
  }

  guardarCambios(): void {
    if (this.productoSeleccionado) {
      this.inventarioService.modificarProducto(this.productoSeleccionado.id, this.productoSeleccionado);
      this.cancelarEdicion();
      this.inventarioService.obtenerProductos().subscribe(productos => {
        this.productos = productos;
      });
    }
  }

  cancelarEdicion(): void {
    this.productoSeleccionado = null;
  }

  eliminarProducto(id: number): void {
    this.inventarioService.eliminarProducto(id);
    this.inventarioService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }
  descargarXML(): void {
    this.inventarioService.descargarXML();
  }

}