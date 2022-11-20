import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { UserGitHub } from '@server/libs/UserGitHub';

const userGitHub = new UserGitHub;

passport.use("auth-github", new GitHubStrategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_SECRET,
	callbackURL: process.env.GITHUB_CALL_BACK_URL,
}, function (_accessToken, _refreshToken, profile, done) {
	//console.log(profile);
	done(null, profile);
	userGitHub.logInByGitHub(profile.username,profile.id, profile.profileUrl, profile.photos);
}
));