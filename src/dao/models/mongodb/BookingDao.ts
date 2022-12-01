import { IBooking } from '../entities/Booking';
import { AbstractDao } from './AbstractDao';
import { Db} from 'mongodb';

export class BookingDao extends AbstractDao<IBooking>{
    public constructor(db:Db){
        super('Booking', db);
    }

    public async insertNewBooking(booking:IBooking, userId:string){
        try{
            const {_id, ...newBooking} = booking;
            newBooking.userId =  userId;
            return await this.createOne(newBooking);
        }
        catch(ex:unknown){
            console.log("BookingDao mongodb:", (ex as Error).message);
        throw ex;}
    }
   
}