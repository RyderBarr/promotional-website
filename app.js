import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {ensureDateFile, listMembers, addmember, dataValidation, getDataValidation} from './utils/members.js'

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



app.post('/api/admin', async(req,res,next)=>{

        try
        {

                let goAhead = false
                let admin = false

                const data = req.body
                console.log(data)

                const cleanData = getDataValidation(data)
                console.log(cleanData)

                const members = await listMembers()

                console.log(members)

                let index = -1

                members.forEach(member => {
                        
                        index++

                        // console.log("entry", cleanData.name, "data", member.name)


                        if(member.name == cleanData.name && member.password == cleanData.password)   
                        {

                                goAhead = true
                                member.admin?admin=true:admin=false

                        }

                });

                if(goAhead && admin)
                {

                        // app.use(express.static(path.join(__dirname,"admin.html")))
                        // app.listen(PORT)
                        res.redirect('/admin')

                }
                else if(goAhead)
                {

                        res.status(200).json(members[index])

                }
                else
                {

                        res.status(200).json({err:"inproper password or username"})

                }


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

        } 
        
        catch (err) 
        {

                next(err)
        
        }

})

// admin
app.use("/admin",(req,res)=>{

        res.sendFile(path.join(__dirname,'admin','admin.html'))

})

// 404
app.use((req,res)=>{

        res.status(404).json({message:"page not found"})

})

app.listen(PORT,()=>{

        console.log(`server running on http://localhost:${PORT}`)

})