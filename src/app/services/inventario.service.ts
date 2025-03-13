import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Producto } from '../models/producto';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private xmlUrl = 'assets/productos.xml'; // Ruta al archivo XML
  private productos: Producto[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectar PLATFORM_ID para verificar si estamos en el navegador
  ) {
    this.cargarProductosDesdeXML().subscribe(productos => {
      this.productos = productos;
    });
  }

  private cargarProductosDesdeXML(): Observable<Producto[]> {
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map((xml) => {
        if (isPlatformBrowser(this.platformId)) { // Verificar si estamos en el navegador
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xml, 'text/xml');
          const productos = Array.from(xmlDoc.querySelectorAll('producto')).map((prod) => ({
            id: Number(prod.getElementsByTagName('id')[0]?.textContent) || 0, // Convertir a número
            nombre: prod.getElementsByTagName('nombre')[0]?.textContent ?? 'Sin nombre',
            precioP: Number(prod.getElementsByTagName('precio')[0]?.textContent) || 0, // Convertir a número
            imagen: prod.getElementsByTagName('imagen')[0]?.textContent ?? 'sin_imagen.jpg'
          }));
          return productos;
        }
        return []; // Si no estamos en el navegador, devolver un arreglo vacío
      })
    );
  }

  obtenerProductos(): Observable<Producto[]> {
    return of(this.productos); // Devuelve los productos en memoria
  }

  agregarProducto(producto: Producto): void {
    producto.id = this.productos.length + 1; // Asignar un nuevo ID
    this.productos.push(producto); // Agregar el producto al arreglo en memoria
    this.actualizarXML(); // Simular la actualización del XML
  }

  modificarProducto(id: number, productoActualizado: Producto): void {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...productoActualizado, id }; // Actualizar el producto
      this.actualizarXML(); // Simular la actualización del XML
    }
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id); // Filtrar y eliminar el producto
    this.actualizarXML(); // Simular la actualización del XML
  }

  private actualizarXML(): void {
    // Simular la actualización del XML generando un nuevo XML a partir del arreglo en memoria
    const xmlString = this.generarXMLDesdeProductos(this.productos);
    console.log('XML actualizado:', xmlString);
  }

  private generarXMLDesdeProductos(productos: Producto[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const productosXML = productos.map(prod => `
      <producto>
        <id>${prod.id}</id>
        <nombre>${prod.nombre}</nombre>
        <precio>${prod.precioP}</precio>
        <imagen>${prod.imagen}</imagen>
      </producto>
    `).join('');

    return `${xmlHeader}<productos>${productosXML}</productos>`;
  }
}