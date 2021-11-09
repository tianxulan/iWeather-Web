import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultAvailableTransferServiceService } from '../result-available-transfer-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  resultAvaliable: boolean = false;
  constructor(private router: Router, private _resultAvailableTransferService: ResultAvailableTransferServiceService) { }

  ngOnInit(): void {

    this._resultAvailableTransferService.currentResultAvailable.subscribe(result =>{
      this.resultAvaliable = result;
    });    
    if (this.resultAvaliable)
    {
      this.router.navigate(['/main/result/resultHome/dayView'])
    }
    else
    {
      //leave result as blank
    }
  }

}
