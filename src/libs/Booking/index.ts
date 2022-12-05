import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { BookingDao } from "@server/dao/models/mongodb/BookingDao";
import { IBooking } from "@server/dao/models/entities/Booking";

export class Booking {
    private dao: BookingDao;
    public constructor() {
        getConnection()
            .then(conn => {
                this.dao = new BookingDao(conn);
            })
            .catch(ex => console.error(ex));
    }

    public async insertNewBooking(booking: IBooking, userId: string) {
        const {date,name,place} = booking;
        return await this.dao.insertNewBooking({
            date:new Date(date),
            name,
            place,
        },userId);
    }

    public getBookingByUserPaged(userId:string, page:number, items:number ){
        return this.dao.getBookingByUserPaged(userId, page, items);
      }

    public getBookingById(identifier: string) {
        return this.dao.getBookingById(identifier);
    }

    public deleteBooking(index:string) {
        return this.dao.deleteBooking({_id:index});
    }
}