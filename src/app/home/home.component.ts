import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    allRequest:any=0;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get(`http://localhost:8083/getApprovedFilteredSellRequest`).subscribe(res=>{
      this.allRequest=res
})
  }

}
