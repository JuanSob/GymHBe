import { IBooking } from '../entities/Booking';
import { AbstractDao } from './AbstractDao';
import { Db,ObjectId} from 'mongodb';

export class BookingDao extends AbstractDao<IBooking>{
    public constructor(db:Db){
        super('Booking', db);
    }

    public async insertNewBooking(booking:IBooking, userId:string){
        try{
            const {_id, ...newBooking} = booking;
            newBooking.userId =  new ObjectId(userId);
            return await this.createOne(newBooking);
        }
        catch(ex:unknown){
            console.log("BookingDao mongodb:", (ex as Error).message);
        throw ex;}
    }
   
    public async getBookingByUserPaged(userId: string, page:number = 1, itemsPerPage: number = 10){
        try {
          const total = await super.getCollection().countDocuments({userId: new ObjectId(userId)});
          const totalPages = Math.ceil(total / itemsPerPage);
          const items = await super.findByFilter(
            { userId: new ObjectId(userId)},
            { sort:{'type': -1},
              skip:((page-1) * itemsPerPage),
              limit:itemsPerPage
              }
            );
            return {
              total,
              totalPages,
              page,
              itemsPerPage,
              items
            };
        } catch (ex) {
          console.log("BookingDao mongodb:", (ex as Error).message);
          throw ex;
        }
      }


    public async getBookingById( identifier:string ){
        try{
            const result = await super.findByID(identifier);
            return result;
        }
        catch(ex:unknown){
            console.log("BookingDao mongodb:", (ex as Error).message);
        throw ex;}
    }

    public async deleteBooking ( deleteBooking: Partial<IBooking>){
        try{
            const {_id} = deleteBooking;
            const result = await super.delete(_id as string);
            return result;
        }
        catch(ex:unknown){
            console.log("BookingDao mongodb:", (ex as Error).message);
        throw ex;}
    }
}