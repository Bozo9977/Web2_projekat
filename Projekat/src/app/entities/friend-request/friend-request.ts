export class FriendRequest {

    ID: number;
    SenderID: string;
    ReceiverID: string;
    Accepted: boolean;
    SenderFirstName: string;
    SenderLastName: string;
    SenderCity: string;

    constructor(id: number, sender: string, receiver: string, accepted: boolean, firstName: string, lastName: string, city: string){
        this.ID = id;
        this.SenderID = sender;
        this.ReceiverID = receiver;
        this.Accepted = accepted;
        this.SenderCity = city;
        this.SenderFirstName = firstName;
        this.SenderLastName = lastName;
    }
}
