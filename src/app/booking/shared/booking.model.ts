import { Rental } from '../../rental/shared/rental.model';
import { User } from '../../auth/shared/user.model';


export class Booking {

    static readonly DATE_FORMAT = 'DD/MM/YYYY';

    id: string;
    startAt: string;
    endAt: string;
    totalPrice: number;
    guests: number;
    days: number;
    createdAt: string;
    userId: string; // user object
}
