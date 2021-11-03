import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
const nonWhitespaceRegExp: RegExp = new RegExp("\\S");

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  spaceOnlyPattern = ".*[^ ].*";
  constructor(private fb: FormBuilder) { 
    
    
    this.searchForm = this.fb.group({
      inputStreet: ['',Validators.required],
      inputCity: ['', Validators.required ]
      inputSubmit:['']
   });
  
  }
  
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
  ngOnInit(): void {
    
    
  }

}

