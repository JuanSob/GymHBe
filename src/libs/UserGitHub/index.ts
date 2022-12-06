import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { UserGitHubDao } from "@server/dao/models/mongodb/UserGitHubDao";

export class UserGitHub {
	private dao: UserGitHubDao;
	public constructor() {
		getConnection()
			.then(conn => {
				this.dao = new UserGitHubDao(conn);
			})
			.catch(ex => console.error(ex));
	}

	public async logInByGitHub(username: string, gitHubId:string, profileUrl:string, photos:[])
	{
		try{
			const user = await this.dao.findUserByGitHubId(gitHubId);
			if(!!!user){
				const day = new Date();
				const newUserGitHub = {
					username,
					gitHubId,
					created: day,
					lastLogin: day,
					profileUrl,
					photos,
					userType: 'GitHubUser'
				}
				return this.dao.createNewUser(newUserGitHub);
			}
			else{
				await this.dao.signIn(user._id.toString());
				return user;
			}
		}
		catch(err){
			console.log('LOGIN GITHUB:', err);
			throw err
		}
	}
}