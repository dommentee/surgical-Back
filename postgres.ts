import {Client} from 'pg'

const dbConfig = {
    connectionString: 'postgresql://localhost:5432/medical_procedures',
    
}
if(process.env.DATABASE_URL){
    //@ts-ignore allow ssl on dbconfig
	dbConfig.ssl = { rejectUnauthorized: false }
	dbConfig.connectionString = process.env.DATABASE_URL
}

const client = new Client(dbConfig)

export default  client;
