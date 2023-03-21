import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  radioValue!:number
  radioValue2!:number

  allData:any=0
  biddingData:any|null=0
  constructor( private adminService:AdminDashboardService,
    private http:HttpClient
    ) {

     }

  ngOnInit(): void {

    this.adminService.getAllDetails().subscribe(res=>{
      this.allData=res
      // console.log(res)
          })

          this.adminService.getAllBidding().subscribe(res=>{
            this.biddingData=res
            console.log(res)
          })
  }
  getValue(event:any){
    console.log(event.target.value)

    this.radioValue=event.target.value
  }

approveRequest(){

let x= Number(this.radioValue)
// console.log(this.radioValue)
console.log(typeof(x))
  this.http.post(`http://localhost:8083/approveSellRequest/${x}`,null).subscribe({
    next:data=>{console.log(data)
      this.http.post(`http://localhost:8083/updateSellApi/${x}`,null).subscribe(res=>{console.log(res)
      alert("status changed")
  }
    )

    },
    error:err=>alert("please click on radio button then click on approve button !")
  })



//   this.http.post(`http://localhost:8083/updateSellApi/${x}`,null).subscribe(res=>{console.log(res)
//     alert("status changed")
// }
//   )

}


getValue2(event:any){
this.radioValue2= event.target.value
console.log(this.radioValue2)

}
approveBidding(bid:any,bidId:any){

  let y= Number(this.radioValue2)
  console.log( "request id "+ y)
    let current_bid=bid
    console.log(current_bid)
console.log(this.radioValue2)
    if(this.radioValue2>0){

      this.http.post(`http://localhost:8083/approveBid/${y}/${current_bid}`,null).subscribe(res=>{console.log(res)
      alert("Bidding request has been approved")

      let BIDID=bidId
      this.http.post(`http://localhost:8083/updateBiddingRequest/${BIDID}`,null).subscribe(res=>{console.log(res)
      alert("status has been changed to approved")
    }
      )
    }
      )


    }else if(this.radioValue2==undefined){
      alert('please click on radio button then click on approve button !')
    }








}

rejectSellRequest(id:any){

  let sellId=id
  console.log(sellId)
  this.http.post(`http://localhost:8083/updateRejectStatus/${sellId}`,null).subscribe(res=>{console.log( "sell req id is "+res)

  alert("selling request has been rejected")
}
  )

}

rejectBidding(id:any){

  let bidId=id
  console.log("bidId is "+ bidId)
  this.http.post(`http://localhost:8083/rejectBiddingRequest/${bidId}`,null).subscribe(res=>{console.log( " bid id is "+res)

  alert("bidding request has been rejected")
}
  )

}




}
