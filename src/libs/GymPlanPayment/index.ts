import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { GymPlanPaymentDao } from "@server/dao/models/mongodb/GymPlanPaymentDAO";
import { IGymPlanPayment } from "@server/dao/models/entities/GymPlanPayment";

export class GymPlanPayment {
	private dao: GymPlanPaymentDao;
	public constructor() {
		getConnection()
			.then(conn => {
				this.dao = new GymPlanPaymentDao(conn);
			})
			.catch(ex => console.error(ex));
	}

	public async addNewPayment(GymPlanPayment: IGymPlanPayment, userId: string) {
		try {
			let { monthAmount, pricePerMonth, planDescription } = GymPlanPayment;
			const user = await this.dao.getUserLastPayment(userId);
			const today = new Date();
			if(user){
				if(user.endSubscription.getTime() > today.getTime())
				{
					throw new Error("Already have a active subscription");
				}
			}
			if (monthAmount < 2 || monthAmount > 12) {
				throw new Error("Amount of month is invalid");
			}
			const sumMonthDate = new Date(today.setMonth(today.getMonth() + monthAmount));
			console.log("La fecha: "+sumMonthDate);
			const isv = (pricePerMonth * 0.15);
			const total = Number((pricePerMonth * monthAmount) + (isv * monthAmount));
			return this.dao.insertNewPayment(
				{
					date: new Date(),
					monthAmount: Number(monthAmount),
					endSubscription: new Date(today.setMonth(today.getMonth() + monthAmount)),
					pricePerMonth: Number(pricePerMonth),
					planDescription,
					isv,
					total
				}, userId
			)
		}
		catch (err) {
			console.log("Payment:", err);
			throw err;
		}
	}

	public getPaymentByUser(id: string, page:number, items:number ) {
		return this.dao.getUserPayment(id, page, items);
	}
}