import { Component, OnInit } from '@angular/core';
import { MahasiswaService } from '../mahasiswa.service';

@Component({
  selector: 'app-pengurus-list',
  templateUrl: './pengurus-list.component.html',
  styleUrls: ['./pengurus-list.component.css']
})
export class PengurusListComponent implements OnInit {

  constructor(private mhsService: MahasiswaService) { }

  ngOnInit(): void {
    this.mhs = ths.mhsService.getEmployees();
  }

}
