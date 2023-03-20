import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  constructor(private fb: FormBuilder) { }
  showDelete: boolean = false;
data = [{clientName: ['', Validators.required]}];
 clientForm: FormGroup = this.fb.group({
    clientNames: this.fb.array(this.data.map(
      clientName => this.fb.group(clientName)
      )
    )
  });
  get clientNames(): FormArray {
    return this.clientForm.get('clientNames') as FormArray;
  }
  onSubmit() {
    this.clientNames.push(this.fb.group({
      clientName: ['',Validators.required]
    }));
    if(this.clientNames.length > 1){
      this.showDelete = true;
    }
    console.log(this.clientForm.value);
  }

  removeField(index: number){
    if (this.clientNames.length > 1){this.clientNames.removeAt(index);}
    else{
      this.showDelete = false;
       this.clientNames.patchValue([{clientName: ['',Validators.required]}]);
       this.clientForm.reset();
    }
  }
}
