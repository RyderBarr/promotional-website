import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {ensureDateFile, listMembers, addmember, dataValidation} from './utils/members.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5500

// Middleware

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// static Folder

app.use(express.static(path.join(__dirname,"public")))

ensureDateFile()//makes sure the data file(members.json) exists when the project boots

// Routes

app.get('/api/members', async(req,res,next)=>{

        try{

                // let goAhead = false

                // const data = req.body
                
                // const cleanData = dataValidation(data)

                const members = await listMembers()

                res.status(200).json({count:members.length, members})


        }catch(err)
        {
                next(err)
        }

})

// API Routes

app.post("/api/members", async(req,res,next)=>
{
        try
        {

                const data = req.body
                const created = await addmember(data)
                res.status(201).json({message:"member Added",member:created})

        } catch (err) 
        {

                next(err)
        
        }
})

// 404
app.use((req,res)=>{

        res.status(404).json({message:"page not found"})

})

app.listen(PORT,()=>{

        console.log(`server running on http://localhost:${PORT}`)

})