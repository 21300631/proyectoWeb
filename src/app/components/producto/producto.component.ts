import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { HttpClientModule } from '@angular/common/http';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-producto', 
  standalone: true,
  imports: [CommonModule],
  templateUrl:  './producto.component.html',
  styleUrls: ['./producto.component.css']
})


export class AppComponent implements OnInit {
  productos: any[] = []; // Cambia el tipo a any[] para evitar errores de tipo

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router,
    private inventarioService: InventarioService // Inyecta el servicio de inventario
  ) {}

  

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe( data=>{
      this.productos = data as any[]; // Cambia el tipo a any[] para evitar errores de tipo
    }
    );
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }

  irAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  irAlInventario(): void {
    this.router.navigate(['/inventario']); 
  }
}
