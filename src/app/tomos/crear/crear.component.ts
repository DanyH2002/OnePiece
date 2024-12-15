import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpLaravelServiceService } from '../../http-laravel-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiResponse, Tomo } from '../interfaces/tomos.interface';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  ID = '0';
  tomo: Tomo | undefined;
  response: ApiResponse | undefined;
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tomosService: HttpLaravelServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      numero_tomo: [null, [Validators.required, Validators.min(1)]],
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      capitulos_incluidos: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      sinopsis: ['', Validators.required],
      portada: ['', Validators.required]  // He añadido portada como obligatorio
    });

    // Suscripción a los parámetros de la ruta
    this.activatedRoute.params.subscribe(params => {
      if (!params['id']) return;

      this.ID = params['id'];
      this.tomosService.getTomo(Number.parseInt(this.ID)).subscribe((response: ApiResponse) => {
        this.response = response;
        
        // Verificar si 'response.data' es un solo 'Tomo' o un arreglo de 'Tomo'
        const tomoData = Array.isArray(response.data) ? response.data[0] : response.data;
        this.updateForm(tomoData);  // Actualizar formulario con el tomo recibido
      });
    });
  }

  ngOnInit(): void {}

  // Getter para acceder a los controles del formulario
  get f() {
    return this.formulario.controls;
  }

  // Función para actualizar el formulario con los valores del tomo
  updateForm(tomo: Tomo): void {
    if (!tomo) return;
    this.formulario.patchValue({
      numero_tomo: tomo.numero_tomo,
      titulo: tomo.titulo,
      capitulos_incluidos: tomo.capitulos_incluidos,
      sinopsis: tomo.sinopsis,
      fecha_publicacion: tomo.fecha_publicacion,
      portada: tomo.portada
    });
  }

  // Función al enviar el formulario
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const formValue = this.formulario.value;

    if (this.ID === "0") {
      // Crear nuevo tomo
      this.tomosService.addTomo(formValue).subscribe(
        () => {
          Swal.fire({
            title: 'Tomo creado exitosamente',
            icon: 'success'
          });
          this.router.navigate(['/tomos']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al crear el tomo',
            text: error.message,
            icon: 'error'
          });
        }
      );
    } else {
      // Actualizar tomo existente
      this.tomosService.updateTomo(Number.parseInt(this.ID), formValue).subscribe(
        () => {
          Swal.fire({
            title: 'Tomo actualizado exitosamente',
            icon: 'success'
          });
          this.router.navigate(['/tomos']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al actualizar el tomo',
            text: error.message,
            icon: 'error'
          });
        }
      );
    }
  }
}
