import express from 'express'
import postgres from '../postgres'
import bcrypt from 'bcrypt';
import { createTokens, Req } from '../models/authentication';
const router = express.Router();

export interface User {
    id: number
    username: string
    authCount: number
}

//create user
router.post('/', (req, res) => {
    const {user_name, password} = req.body 
    postgres.query(`INSERT INTO users (user_name, password, auth_count) VALUES ($1, $2, $3) RETURNING *`, 
    [user_name, bcrypt.hashSync(password, bcrypt.genSaltSync(10)), 0], (error, results) => {
        if(error) {
            return res.status(401).send({error});
        }
        res.status(200)
    })
})

// function used to find user in login file login
export const findUserById = (id:number): Promise<User> => {
    return new Promise((resolve:(user: User) => void , reject) => {
      postgres.query(`SELECT * FROM users WHERE user_id = ${id}`, (error, results) => {
        if (error) {
          reject(error)
          return
        }
        const user: User = {
            id: results.rows[0].user_id,
            username: results.rows[0].user_name,
            authCount: results.rows[0].auth_count
        }
        resolve(user)
      })
    }) 
}

router.get('/', (req: Req, res) => {
    if(req.userId){
        findUserById(req.userId).then((user) =>{
            res.json(user)
        })
    }
})

router.get('/users/:user', (req,res) => {
    //@ts-ignore
    const {user} = req.params;
    console.log(req.body);
    postgres.query(`SELECT * FROM users WHERE user = '${user}'`, (userError, userInfo) => {

    })
})


// export const findUserById = (id:number) => {
//     postgres.query(`SELECT * FROM users WHERE user_id = ${id}`, (error, results) => {
//         const user: User = {
//             id: results.rows[0].user_id,
//             username: results.rows[0].user_name,
//             authCount: results.rows[0].auth_count
//         }
//     })
// }





export default router
