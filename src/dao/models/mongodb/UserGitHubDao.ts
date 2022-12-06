import {IUserGitHub} from '../entities/UserGitHub';
import { AbstractDao } from './AbstractDao';
import { Db } from 'mongodb';

export class UserGitHubDao extends AbstractDao <IUserGitHub>{
    public constructor(db: Db) {
		super('usersGithub', db);
	}

	createNewUser(userGitHub: IUserGitHub){
		const { ...newUser} = userGitHub;
		return this.createOne(newUser);
	}

	signIn(id:string)
	{
		const currentDate = new Date;
		return this.update(id,{lastLogin:currentDate});
	}

	findUserByGitHubId(gitHubId:string)
	{
		const query = { gitHubId };
		return this.findOneByFilter(query);
	}
}