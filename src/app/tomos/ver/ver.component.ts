import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpLaravelServiceService } from '../../http-laravel-service.service';
import { ApiResponse, Tomo } from '../interfaces/tomos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit {
  ID = 0;
  Tomo: Tomo | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private tomosService: HttpLaravelServiceService,
    private router: Router
  ) {
    this.activateRoute.params.subscribe((params) => {
      this.ID = Number(params['id']);
    });
  }

  ngOnInit(): void {
    this.tomosService.getTomo(this.ID).subscribe(
      (response: ApiResponse) => {
        console.log(response);
        
        // Verificar si 'data' es un solo 'Tomo' o un arreglo de 'Tomos'
        if (Array.isArray(response.data)) {
          this.Tomo = response.data[0]; // Si es un arreglo, tomar el primer tomo
        } else {
          this.Tomo = response.data; // Si es un solo tomo, asignarlo directamente
        }
      },
      (error) => {
        Swal.fire({
          title: 'No se encuentra el tomo',
          text: 'Por favor verifica que exista.',
          icon: 'warning',
        }).then(() => {
          this.router.navigate(['/tomos']);
        });
      }
    );
  }

  borrar(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tomosService.deleteTomo(this.ID).subscribe(
          () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El tomo ha sido eliminado.',
              icon: 'success',
            }).then(() => {
              this.router.navigate(['/tomos']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el tomo. Intenta nuevamente.',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
