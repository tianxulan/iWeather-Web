import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../animations';
import { ResultAvailableTransferServiceService } from '../result-available-transfer-service.service';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  animations:[slideInAnimation]
})
export class ResultComponent implements OnInit {
  resultAvailable = false;
  constructor(private router: Router, private _resultAvailableTransferService: ResultAvailableTransferServiceService) { }

  ngOnInit(): void {

   
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
