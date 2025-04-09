import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Producto } from '../models/producto';


@Injectable({providedIn: 'root'})
export class ProdcutoService{
  private apiUrl = 'http://localhost:3000/api/productos'; // Usa el mismo endpoint que InventarioService
  constructor(private http: HttpClient) {}
  obtenerProductos(){
    return this.http.get(this.apiUrl);
  }

}