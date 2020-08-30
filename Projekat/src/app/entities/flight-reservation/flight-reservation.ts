import { FlightSeat } from '../flight-seats/flight-seat';
import { User } from '../user/user';

export class FlightReservation {
    seats: Array<FlightSeat>;
    passport: string;
    invitedFriends: Array<User>;
    user:string;
    flightId: number;
}
