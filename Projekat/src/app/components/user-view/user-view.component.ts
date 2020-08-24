import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import * as jwt_decode from 'jwt-decode';
import { FriendRequest } from 'src/app/entities/friend-request/friend-request';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  friends: User[];
  searchFriendsForm: FormGroup;
  searched: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.searchFriendsForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl('')
    });
  }

  onSearchFriends(){
    this.searched = true;
    if(this.searchFriendsForm.get('firstName').value != "" || this.searchFriendsForm.get('lastName').value != ""){
      
      this.userService.searchForFriends(this.searchFriendsForm.value).subscribe(
        (res: any) => {
          this.friends = res as User[];
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
      err => {
        console.log(err);
      }
    )
    
  }
}
