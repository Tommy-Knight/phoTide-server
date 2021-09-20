import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

const facebookStrategy = new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_CLIENT_ID as string,
		clientSecret: process.env.FACEBOOK_SECRET as string,
		callbackURL: "http://localhost:3001/users/facebookRedirect",
	},

	async (profile: any, passportNext: any) => {
		try {
			console.log(profile);
		} catch (error) {
			console.log(error);
			passportNext(error);
		}
	}
);

passport.serializeUser(function (user, passportNext) {
	passportNext(null, user);
});

export default facebookStrategy;
