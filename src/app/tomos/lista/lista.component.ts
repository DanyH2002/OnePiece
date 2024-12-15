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
  fechaPublicacionQuery: string = '';  // Consulta de fecha de publicación

  constructor(private tomoService: HttpLaravelServiceService) {}

  ngOnInit(): void {
    this.cargarTomos();
  }

  cargarTomos(): void {
    this.tomoService.getTomos().subscribe((response: ApiResponse) => {
      console.log('Cargando tomos:', response);
      
      // Verificar si 'response.data' es un solo 'Tomo' o un arreglo de 'Tomo'
      if (Array.isArray(response.data)) {
        this.tomos = response.data;  // Si es un arreglo, asignarlo directamente
      } else {
        this.tomos = [response.data];  // Si es un solo 'Tomo', convertirlo en arreglo
      }
    });
  }

  buscarTomos(): void {
    console.log("Buscando tomos con query:", this.searchQuery);
    
    if (this.searchQuery.trim() === '') {
      console.log("Query vacío, cargando todos los tomos.");
      // Si la búsqueda está vacía, cargar todos los tomos
      this.cargarTomos();
    } else {
      // Primero intenta buscar por título usando el filtro
      console.log("Buscando por título primero...");
      this.tomoService.filtrarTomo(this.searchQuery, 'titulo').subscribe((response: ApiResponse) => {
        console.log("Respuesta del filtrado por título:", response);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          console.log("Encontrados tomos por título.");
          this.tomos = response.data;
        } else {
          console.log("No se encontraron tomos por título, buscando en términos generales...");
          // Si no se encuentran resultados, realizar una búsqueda general
          this.tomoService.searchTomo(this.searchQuery).subscribe((response: ApiResponse) => {
            console.log("Respuesta de la búsqueda general:", response);
            
            if (Array.isArray(response.data)) {
              this.tomos = response.data;
            } else {
              this.tomos = [response.data];
            }
          });
        }
      });
    }
  }

  filtrarTomos(tipoFiltro: string): void {
    let filtro = '';
    if (tipoFiltro === 'numero_tomo') {
      filtro = this.tomoNumberQuery.toString().trim();
    } else if (tipoFiltro === 'fecha_publicacion') {
      filtro = this.fechaPublicacionQuery.trim();
    }

    console.log(`Filtrando por ${tipoFiltro} con valor:`, filtro);

    if (filtro === '') {
      console.log("Filtro vacío, cargando todos los tomos.");
      // Si el filtro está vacío, cargar todos los tomos
      this.cargarTomos();
    } else {
      this.tomoService.filtrarTomo(filtro, tipoFiltro).subscribe((response: ApiResponse) => {
        console.log(`Respuesta del filtrado por ${tipoFiltro}:`, response);

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
