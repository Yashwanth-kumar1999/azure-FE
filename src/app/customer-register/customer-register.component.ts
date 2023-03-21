
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

     customerId=0;
     message="";


  constructor(private service:RegisterService,private router:Router) { }

   customer:Customer=new Customer();




  ngOnInit(): void {

  }

  processRegistration(){
      this.customer.userType='farmer';
    this.service.register(this.customer).subscribe(
      res=>{

        alert(JSON.stringify(res))
      if(res.status==true){

        this.customerId=res.registeredCustomerId;

        this.router.navigate(['/login'])
      }else{
        this.message=res.messageIfAny;
      }
    }

    )

  }



}
