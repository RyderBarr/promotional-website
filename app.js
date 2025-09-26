import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {ensureDateFile, listStudents, addStudent} from './utils/students.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5500

// Middleware

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// static Folder

app.use(express.static(path.join(__dirname,"public")))

ensureDateFile()//makes sure the data file(students.json) exists when the project boots

// Routes

// app.get('/appi/student', async(req,res,next)=>{

//         try{
//                 const student = await listStudents()
//                 res.status(200).json({count:student.length, students})
//         }catch(err)
//         {
//                 next(err)
//         }

// })

// API Routes

app.post("/api/students", async(req,res,next)=>
{
        try
        {

                const data = req.body
                const created = await addStudent(data)
                res.status(201).json({message:"Student Added",student:created})

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