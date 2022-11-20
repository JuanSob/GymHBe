import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get("/github",
	passport.authenticate("auth-github", { scope: ["user:email"], session: false })
);

router.get("/github/callback", passport.authenticate("auth-github", { scope: ["user:email"], session: false }),
	(req, res) => {
		res.status(200).json((<any>req).user)
	})

export default router;