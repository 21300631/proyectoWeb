import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito:Producto[] = [];
  agregarProducto(producto:Producto){
    this.carrito.push(producto);
  }

  obtenerCarrito():Producto[]{
    return this.carrito;
  }

  generarXML():string{
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n';
    this.carrito.forEach((producto, index)=> {;
      xml += '<producto id= "${producto.id}>" <nombre>${producto.nombre}</nombre> </producto>\n';
        
  })
  xml += '</recibo>';
  return xml;
}
}