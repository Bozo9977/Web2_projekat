import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import * as jwt_decode from 'jwt-decode';
import { FriendRequest } from 'src/app/entities/friend-request/friend-request';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  friends: User[];
  searchFriendsForm: FormGroup;

  searched: boolean = false;
  requested: boolean = false;
  nothing: boolean = true;

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.searchFriendsForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl('')
    });

    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];
    this.userService.getFriendsForUser(UserID).subscribe(
      (res:any)=>{
        this.friends = res as User[];
        console.log(this.friends);
      },
      err=>{
        console.log(err);
      }
    )
  }

  onSearchFriends(){
    this.searched = true;
    this.requested = false;
    this.nothing= false;

    if(this.searchFriendsForm.get('firstName').value != "" || this.searchFriendsForm.get('lastName').value != ""){
      
      this.userService.searchForFriends(this.searchFriendsForm.value).subscribe(
        (res: any) => {
          this.friends = res as User[];
          if(this.friends.length===0)
            alert("No user matches your search.")
        },
        err =>{
          console.log(err);
        }

      )

    }else{
      alert("You must enter either first or last name");
    }
  }

  addFriend(id: string){


    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];

    var loggedInUser: User = JSON.parse(localStorage.getItem('userDetails'));
    console.log(loggedInUser);
    var fr: FriendRequest = new FriendRequest(0, UserID, id, false, loggedInUser.firstName, loggedInUser.lastName, loggedInUser.city);

    console.log(fr);

    this.userService.addFriend(fr).subscribe(
      (res:any)=>{
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
      }
    )
    
  }


  myRequests(){
    this.requested = true;
    this.searched = false;
    this.nothing = false;

    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];
    this.userService.getRequestsForUser(UserID).subscribe(
      (res:any)=>{
        console.log(res);
        this.friends = res as User[];

        if(this.friends.length===0)
          alert("No new requests");
      },
      err=>
      {
        console.log(err);
      }
    )
  }

  acceptFriend(id: string){
    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];

    var ids: string;
    ids = id + '_' + UserID;
    //console.log(ids);

    this.userService.acceptFriend(ids).subscribe(
      (res:any)=> {
        console.log(res);
      },
      err=> {
        console.log(err);
      }
    )

  }


  goBack(){
    this.location.back();
  }
}
