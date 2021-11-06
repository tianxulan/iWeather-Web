import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-home',
  templateUrl: './result-home.component.html',
  styleUrls: ['./result-home.component.css']
})
export class ResultHomeComponent implements OnInit {
  city: string = "";
  state:string = "";
  isBiStar = true;
  isBiStarFill = false;
  isFavorite = false;
  constructor() { }

  ngOnInit(): void {
  }
  starOnClick()
  {
    this.isBiStar = !this.isBiStar;
    this.isBiStarFill = !this.isBiStarFill; 
    this.isFavorite = !this.isFavorite;
  }

}
