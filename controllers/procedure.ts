
import express from 'express'
import postgres from '../postgres'
const router = express.Router()

//query all

interface SearchProcedureRespose {//created an interface for procedures
    procedures: Array<Object>
    stats: {
        avgPrice: number
        avgHealTime: number
    }
}

// router.get('/', (req,res) => {
//     postgres.query('SELECT FROM procedures WHERE contributor_id = user_id', (error, results) => {
//         res.json(results.rows)
//     });
// })


router.get('/', (req,res) => {
    
    postgres.query('SELECT * FROM procedures', (error: any, results) => {
        res.json(results.rows)
    });
})
// //create 
router.post('/', (req,res) => {
    const {name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time, contributor_id} = req.body;//destructer
    postgres.query(`INSERT INTO procedures (name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time, contributor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time, contributor_id], (error, results) => {
        res.json(results.rows[0])
    });
    
})

// router.get('/:id', async(req,res,next) => {
//     console.log(req.params.id);
    
//     try{
//         const {id} = req.params;
//         const selectedProcedure = await postgres.query('SELECT * FROM procedures WHERE procedure_id = $1', 
//             [id]
//         );
//         res.json(selectedProcedure.rows)//finds selected procedure
//     }catch(err: any) {
//         console.error(err.message)
//     }
// })

//delete
router.delete('/:id', (req,res) => {
    const {id} = req.params
    postgres.query('DELETE FROM procedures WHERE procedure_id = $1', [id]);
    res.json('procedure Deleted')
})

// //update
router.put('/:id', (req,res) => {
    const {id} = req.params;
    const {name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time} = req.body;
    postgres.query('UPDATE procedures SET (name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time) = ($1, $2,$3, $4, $5, $6, $7) WHERE procedure_id = $8',
    [name, price, hospital_name,hospital_city,hospital_state,hospital_rating,heal_time,id]);
    res.json("updated")

})

// search
router.get('/search/:search', (req,res) => {
    //@ts-ignore
    const {search} = req.params;
    console.log(req.body);
    postgres.query(`SELECT ROUND(AVG(price), 2) AS avgPrice, ROUND(AVG(heal_time), 2) AS avgHealTime FROM procedures WHERE name = '${search}' `, (avgError, avgResults) => {
        postgres.query(`SELECT * FROM procedures WHERE name = '${search}' `, (error, results) => {
            const procedureRespose: SearchProcedureRespose = {
                procedures: results.rows, 
                    stats: {
                        avgPrice: avgResults.rows[0].avgprice,
                        avgHealTime: avgResults.rows[0].avghealtime
                        

                    }
                }
                console.log(avgResults.rows);
                
                res.json(procedureRespose)
            })
    })
})





// router.get('/search/:search', (req,res) => {
//     //@ts-ignore
//     const {search} = req.params;
//     console.log(req.body);
//     postgres.query(`SELECT * FROM procedures WHERE name = '${search}' `, (error, results) => {


//         // const procedureRespose: ProcedureRespose = {
//         //     procedures: results.rows, 
//         //     stats: {
//         //         avgCost: 
//         //     }
//         // }
//         res.json(
//             results.rows

//             )
//     })
// })
export default router


