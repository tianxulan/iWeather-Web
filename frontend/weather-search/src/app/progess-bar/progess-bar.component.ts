import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progess-bar',
  templateUrl: './progess-bar.component.html',
  styleUrls: ['./progess-bar.component.css']
})
export class ProgessBarComponent implements OnInit {

  constructor(private router: Router){ }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(["/main/result/resultHome/dayView"]);
  }, 1000);
  }

}
