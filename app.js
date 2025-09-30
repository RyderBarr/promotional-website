import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {ensureDateFile, listMembers, addmember, dataValidation, getDataValidation} from './utils/members.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5500

let adminPage = 
`
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./style/test.css">
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>


</head>
<body class="">

        <div class="w-[100vw] h-min-[100vh] bg-amber-100 flex flex-col justify-start text-center">

                <header class="flex flex-row justify-evenly items-center w-[100vw] h-[10vw] bg-amber-200">
                        
                        <div class="w-[80vw]  flex flex-col justify-around">
                                
                                <p class="text-3xl">zia records admin</p>

                                <div class="flex flex-row justify-around">

                                        <a href="./sign-up.html" class="">

                                                sign-up

                                        </a>

                                        <a href="./index.html" class="">

                                                sign-in

                                        </a>

                                </div>

                        </div>

                        <a target="_blank" href="https://www.ziarecords.com/?gad_source=1&gad_campaignid=21176292604&gbraid=0AAAAADjjCGW6BWWsx5EPtVlvoghBpAOT3&gclid=CjwKCAjwisnGBhAXEiwA0zEOR24QfHqG6lH8Arstodevys8vTxxDr57x9RbnMGRvrsO_SaxH-Fqs8xoCzPQQAvD_BwE">

                                <img src="https://res-console.cloudinary.com/dzu7xnmgw/thumbnails/v1/image/upload/v1759269267/MjJiOGU3NzItM2Y1Yi00OWE4LTg1NWItMmE0MzI1OWYzYzkxX25mem5lYQ==/preview" alt="" class="w-[7vw] h-[7vw] hover:animate-pulse animate-spin">

                        </a>

                </header>

                <main class="flex flex-col justify-evenly items-center w-[100vw] h-min-[15vw] ">

                        <section class="flex flex-row justify-evenly items-center w-[100vw] h-min-[15vw] m-5">

                                <div id="text1" class="w-[50vw] h-min-[15vw] flex flex-row justify-around items-center">

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class=" w-[15vw]">

                                                look at us we sell and buy records, cds, & casets. Also other items like comics, figures, and clothes
                                                
                                        </div>

                                </div>

                                <div class="w-[50vw] h-min-[15vw] flex flex-row justify-around items-center">

                                        <img src="https://res-console.cloudinary.com/dzu7xnmgw/thumbnails/v1/image/upload/v1759269268/Y2FnZV9hZ2luc3RfdGhlX21hY2hpbmVfdW8xb3A3/preview" alt="" class="w-[15vw] h-[15vw]">

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full">

                                        </div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full">

                                        </div>

                                         <div class="w-0 h-10 m-5 border border-[2px] rounded-full">

                                        </div>

                                </div>

                        </section>

                        <section class="flex flex-row justify-evenly items-center w-[100vw] h-min-[15vw] m-5">

                                <div class="w-[50vw] h-min-[15vw] flex flex-row justify-around items-center">

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        
                                        <img src="https://res-console.cloudinary.com/dzu7xnmgw/thumbnails/v1/image/upload/v1759269268/UGVhcmxKYW0tVnNfZGhhY3l3/preview" alt="" class="w-[15vw] h-[15vw]">

                                </div>

                                <div id="text1" class="w-[50vw] h-min-[15vw] flex flex-row justify-around items-center">

                                        <div class=" w-[15vw]">
                                        
                                                we'll give you money or store credets for your old records 
                                        
                                        </div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                </div>

                        </section>

                        <section class="flex flex-row justify-evenly items-center w-[100vw] h-min-[10vw] m-5">

                                <div id="text1" class="w-[50vw] h-min-[10vw] flex flex-row justify-around items-center">

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-[15vw]">
                                        
                                                if you like music we have the music for you
                                        
                                        </div>

                                </div>

                                <div class="w-[50vw] h-min-[10vw] flex flex-row justify-around items-center">

                                        <img src="https://res-console.cloudinary.com/dzu7xnmgw/thumbnails/v1/image/upload/v1759269268/amFyX29mX2ZsaWVzX2NpamkxdA==/preview" alt="" class="w-[15vw] h-[15vw] ">

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                        <div class="w-0 h-10 m-5 border border-[2px] rounded-full"></div>

                                </div>

                        </section>

                </main>

                <footer>

                        <div class="flex flex-row justify-evenly items-center w-[100vw] h-min-[10vw] m-5" id="members">

                                

                        </div>

                </footer>

                <script src="./script.js"></script>

        </div>

</body>
</html>
`

                        

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

                        console.log("entry", cleanData.name, "data", member.name)

                        if(member.name == cleanData.name && member.password == cleanData.password)   
                        {

                                goAhead = true
                                member.admin?admin=true:admin=false

                        }

                });

                if(goAhead && admin)
                {

                        res.send(adminPage)

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

// 404
app.use((req,res)=>{

        res.status(404).json({message:"page not found"})

})

app.listen(PORT,()=>{

        console.log(`server running on http://localhost:${PORT}`)

})