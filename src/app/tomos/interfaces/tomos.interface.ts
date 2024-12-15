export interface ApiResponse {
  estatus: number;
  data: Tomo | Tomo[]; 
}

export interface Tomo {
  id: number;
  numero_tomo: number;
  titulo: string;
  capitulos_incluidos: string;
  fecha_publicacion: string;
  portada: string;
  sinopsis: string;
  created_at?: string;
  updated_at?: string;
}
