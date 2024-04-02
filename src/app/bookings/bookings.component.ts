import { Component } from '@angular/core';
import { BookigServiceService } from '../services/bookig-service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  bookingList:any=[];
  constructor(private bookingSvc:BookigServiceService){

  }
  ngOnInit(){
    this.getBookings();
  }
  getBookings(){
    this.bookingSvc.getDataFromServer("bookings").subscribe({
      next:(response)=>{
        if(response && response.length > 0){
          this.bookingList = response;
          console.log("booking-list",this.bookingList);
        }
      },
      error:(error)=>{
        console.log(error);
        

      },
      complete:()=>{

      }
    })
  }

  deletRecord(id:string,index:number){
    const selection = confirm("Are you sure");
    console.log(selection);
    if(selection){
      const endPoint = "bookings/" + id
      this.bookingSvc.deleteDataFromServer(endPoint).subscribe({
        next:(response)=>{
          console.log("Delete record successfully");
          // this.getBookings();
          this.bookingList.splice(index,1);
  
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
    
  }

}
