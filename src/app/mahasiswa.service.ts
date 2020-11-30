import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MahasiswaService {

  constructor() {
    return [
      {"id": "SKR", "name": "Kevin H", "age": 20 },
      {"id": "BDH", "name": "Nataya H", "age": 20 },
      {"id": "PRE", "name": "Yukina P", "age": 19 },
      {"id": "HMN", "name": "Wilson P", "age": 19 },
      {"id": "KSM", "name": "Andre I", "age": 21 },
    ]
   }
}