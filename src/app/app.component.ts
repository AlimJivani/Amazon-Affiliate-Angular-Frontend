import { ApiService } from './service/api.service';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,  Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'affiliate';
  footerYear: number = new Date().getFullYear();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}
    
  open(content: any) {
    this.modalService.open(content);
  }

  uPattern = "[a-zA-Z]{6,18}";
  ePattern = '^^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$';
  pPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.uPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.ePattern)]],
    password: ['', [Validators.required, Validators.pattern(this.pPattern)]],
    cpassword: ['',[Validators.required]],
  }, { 
    validator: ConfirmedValidator('password', 'cpassword')
  });
  
  smessage !:string;
  onSubmit() {
    if(this.profileForm.valid){
      let formValueJson = JSON.stringify(this.profileForm.value);
      this.apiService.addUsers(formValueJson).subscribe(data=>{ 
        this.smessage = "Successfully Submited";
        setTimeout(() => { this.smessage = ""; }, 3000);
      }, err => {
        this.smessage = "Enter valid details";
        setTimeout(() => { this.smessage = ""; }, 3000);
        console.log('error' + err);
      });
    }else{
    }
  }


  

}
