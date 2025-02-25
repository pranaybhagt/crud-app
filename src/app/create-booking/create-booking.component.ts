import { Component } from '@angular/core';
import { BookigServiceService } from '../services/bookig-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent {
  
  bookingObj:Booking = new Booking();

  selectedBookingId:string|null =null;
  editBooking:string | null = null;
  constructor(private bookingSvc:BookigServiceService,private router:Router,private activateRoute:ActivatedRoute){

    this.selectedBookingId = this.activateRoute.snapshot.paramMap.get("id");
    this.editBooking = this.activateRoute.snapshot.queryParamMap.get("edit")
    console.log(this.selectedBookingId);
    console.log(this.editBooking);
    
    
  }
  ngOnInit(){
    if(this.editBooking){
      this.getBookingById();
    }


  }
  getBookingById(){
    const endPoint ="bookings/" + this.selectedBookingId;

    this.bookingSvc.getDataFromServer(endPoint).subscribe({
      next:(response:any)=>{
        console.log("Response",response);
        this.bookingObj = {...response}
        
      },
      error:(error)=>{

      }
    })
  }

  saveBooking(){
    if(this.editBooking){
      this.updateBooking();
    }else{
      this.createBooking();
    }
  }

  createBooking(){
    console.log("form data",this.bookingObj);
    this.bookingSvc.postDataToServer("bookings",this.bookingObj).subscribe({

      next:(response:any)=>{
        console.log("Data saved successfully..");
        this.router.navigate(["/booking-list"])
   
      },
      error:()=>{

      },
      complete:()=>{

      }
    })
    console.log("Create Booking Completed");
  }
  updateBooking(){
    const endPoint ="bookings/"+ this.selectedBookingId;
    this.bookingSvc.putDataToServer(endPoint,this.bookingObj).subscribe({
      next:(response)=>{
        console.log("Data Updated successfully");
        this.router.navigate(["/booking-list"]);
        

      },
      error:(error)=>{
        console.log(error);
        

      }
    })
  }
}
class Booking{
  source:string="";
  destination:string="";
  name:string="";
  date:string="";
}
