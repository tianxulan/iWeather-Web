import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { State } from '../states';
import { StatesService } from '../states.service';
const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  spaceOnlyPattern = ".*[^ ].*";
  isAutoDetected = false;
  disableStreet = false;
  stateSelection =""; 
  states: State[]= [];
  constructor(private fb: FormBuilder, private _stateService: StatesService) { 
    
    this.searchForm = this.fb.group({
      inputStreet: [{value:'', disabled: false}, Validators.required],
      inputCity: [{value:'', disabled: false}, Validators.required ],
      inputState: [{value:'',disabled: false}, Validators.required ],
      inputCurrent:['']
   });
  
  }
  
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
  ngOnInit(): void {
    this._stateService.getStates().subscribe((data: any[]) => {console.log(data); this.states=data})
    
  }
  autoDetectOnCheck()
  {
    if(this.isAutoDetected){
      this.searchForm.controls["inputStreet"].enable();
      this.searchForm.controls["inputCity"].enable();
      this.searchForm.controls["inputState"].enable();
    }
    else
    {
      this.searchForm.controls["inputStreet"].disable();
      this.searchForm.controls["inputCity"].disable();
      this.searchForm.controls["inputState"].disable();
    }
    this.isAutoDetected = !this.isAutoDetected;
  }

}

