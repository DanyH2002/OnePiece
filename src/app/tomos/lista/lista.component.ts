import { Component, OnInit } from '@angular/core';
import { HttpLaravelServiceService } from '../../http-laravel-service.service';
import { Tomo, ApiResponse } from '../interfaces/tomos.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  tomos: Tomo[] = [];  // Lista de tomos
  searchQuery: string = '';  // Consulta de búsqueda
  tomoNumberQuery: string = '';  // Consulta de número de tomo

  constructor(private tomoService: HttpLaravelServiceService) {}

  ngOnInit(): void {
    this.cargarTomos();
  }

  cargarTomos(): void {
    this.tomoService.getTomos().subscribe((response: ApiResponse) => {
      console.log(response);
      
      // Verificar si 'response.data' es un solo 'Tomo' o un arreglo de 'Tomo'
      if (Array.isArray(response.data)) {
        this.tomos = response.data;  // Si es un arreglo, asignarlo directamente
      } else {
        this.tomos = [response.data];  // Si es un solo 'Tomo', convertirlo en arreglo
      }
    });
  }

  buscarTomos(): void {
    if (this.searchQuery.trim() === '') {
      // Si la búsqueda está vacía, cargar todos los tomos
      this.cargarTomos();
    } else {
      this.tomoService.searchTomo(this.searchQuery).subscribe((response: ApiResponse) => {
        console.log(response);

        // Verificar si 'response.data' es un solo 'Tomo' o un arreglo de 'Tomo'
        if (Array.isArray(response.data)) {
          this.tomos = response.data;  // Si es un arreglo, asignarlo directamente
        } else {
          this.tomos = [response.data];  // Si es un solo 'Tomo', convertirlo en arreglo
        }
      });
    }
  }

  filtrarTomos(): void {
    if (this.tomoNumberQuery.toString().trim() === '') {
      // Si el filtro está vacío, cargar todos los tomos
      this.cargarTomos();
    } else {
      this.tomoService.filtrarTomo(this.tomoNumberQuery).subscribe((response: ApiResponse) => {
        console.log(response);

        // Verificar si 'response.data' es un solo 'Tomo' o un arreglo de 'Tomo'
        if (Array.isArray(response.data)) {
          this.tomos = response.data;  // Si es un arreglo, asignarlo directamente
        } else {
          this.tomos = [response.data];  // Si es un solo 'Tomo', convertirlo en arreglo
        }
      });
    }
  }
}
