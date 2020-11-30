import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mahasiswa-list',
  templateUrl: './mahasiswa-list.component.html',
  styleUrls: ['./mahasiswa-list.component.css']
})
export class MahasiswaListComponent implements OnInit {

  constructor(private mhsService: MahasiswaService) { }

  ngOnInit(): void {
    this.mhs = ths.mhsService.getEmployees();
  }

}
