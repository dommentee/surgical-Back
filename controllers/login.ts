import express from 'express'
import postgres from '../postgres'
const router = express.Router()
import bcrypt from 'bcrypt';
import { createTokens } from '../models/authentication';

export interface User {
    id: number
    username: string
    authCount: number
}
router.post('/', (req,res) => {
    const {user_name, password} = req.body
    postgres.query(`SELECT * FROM users WHERE user_name = '${user_name}'`, (error, results) => {

        if (error) {
            console.log(error);
            res.send('problem with username or password')
        } else if(results.rows.length === 0){
            return res.status(401)
        }else {
      //if user found
            if (bcrypt.compareSync(password, results.rows[0].password)) {
                const user: User = {
                    id: results.rows[0].user_id,
                    username: results.rows[0].user_name,
                    authCount: results.rows[0].auth_count
                }
                const tokens = createTokens(user);
                res.cookie("refresh-token", tokens.refreshToken, {httpOnly:true, sameSite:'none', secure: true});
                res.cookie("access-token", tokens.accessToken, {httpOnly:true, sameSite:'none', secure: true}).send('cookie set');
                // res.status(200)
                return user;
            }else {
                res.status(401)
                res.send('password do not match')
            }
        }
    })
})

// router.delete('/logout', (req,res) => {
//     res.clearCookie('refresh-token')
// })

export default router