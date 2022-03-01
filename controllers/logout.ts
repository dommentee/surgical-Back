import { signedCookies } from 'cookie-parser';
import express from 'express'
import { Cookie } from 'express-session';
// import { clearLoginCookies } from '../models/authentication';
const router = express.Router();

router.post('/', (req,res, next) => {
    // clearLoginCookies(req, res, next);
    res.cookie("refresh-token", "");
    res.cookie("access-token", "");
    res.send('please')
    next();
})

export default router;