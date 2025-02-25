import { Component, OnInit} from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl : './carrito.component.css'})
  export class CarritoComponent implements OnInit {
    productos: any[]=[];
    constructor(private carritoService:CarritoService){}
    ngOnInit():void{
      this.productos = this.carritoService.obtenerCarrito();
    }
    eliminarProducto(index:number){
      this.carritoService.eliminarProducto(index);
    }
  generarXML(){
    this.carritoService.generarXML();
  }}