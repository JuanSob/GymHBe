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
			console.log(`End Subscription ${user.endSubscription}`);
			if(user.endSubscription.getTime() > today.getTime())
			{
				throw new Error("Already have a active subscription");
			}
			if (monthAmount < 2 || monthAmount > 12) {
				throw new Error("Amount of month is invalid");
			}
			const sumMonthDate = new Date(today.setMonth(today.getMonth() + 8));
			const isv = (pricePerMonth * 0.15);
			const total = Number((pricePerMonth * monthAmount) + (isv * monthAmount));
			return this.dao.insertNewPayment(
				{
					date: new Date(),
					monthAmount: Number(monthAmount),
					endSubscription: sumMonthDate,
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

	public getPaymentByUser(id: string) {
		return this.dao.getUserLastPayment(id);
	}
}