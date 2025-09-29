import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const folder = path.join(__dirname,'..','data')
const file = path.join(folder,"members.json")


export async function ensureDateFile()
{
        try {
                await fs.mkdir(folder, {recursive:true})
                await fs.access(file)
        } catch{
               await fs.writeFile(file, "[]","utf-8") 
        }
}

// read all members
export async function listMembers(){
        const rawData = await fs.readFile(file,"utf-8")
        try {
                return JSON.parse(rawData)
        } catch (err) {
                console.error(err)
                // in case file gone or corrupt
                await fs.writeFile(file,"[]","utf-8")
                return []
        }
}

// validata data
export function dataValidation(input)
{
        const errors = []

        const name = String(input.name || "").trim()
        const email = String(input.email || "").trim()
        const newsLetter = String(input.newsLetter || "").trim()

        if(!name) errors.push("first Name Required")
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/) errors.push("vaid email is required")


        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

        return{
                name:capitalize(name),
                email:email.toLowerCase(),
                newsLetter:newsLetter
        }

}

// Gen ID
function getID()
{

        return(Date.now().toString(36)+Math.random()+toString(36).slice(2,8).toUpperCase)

}

// add member
export async function addmember(input){

        const cleanData = dataValidation(input)

        const newMember={
                id:Date.now().toString(36),
                ...cleanData,
                createdAt: new Date().toISOString()
        }

        const members = await listMembers()
        members.push(newMember)
        await fs.writeFile(file, JSON.stringify(members,null,2), "utf-8")
        return newMember
        
}