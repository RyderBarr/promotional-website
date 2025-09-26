import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const folder = path.join(__dirname,'..','data')
const file = path.join(folder,"students.json")


export async function ensureDateFile()
{
        try {
                await fs.mkdir(folder, {recursive:true})
                await fs.access(file)
        } catch{
               await fs.writeFile(file, "[]","utf-8") 
        }
}

// read all students
export async function listStudents(){
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

// validata dat
function dataValidation(input)
{
        const errors = []

        const firstName = String(input.first || "").trim()
        const lastName = String(input.last || "").trim()
        const email = String(input.email || "").trim()
        const gradelevel = String(input.gradeLevel || "").trim()

        if(!firstName) errors.push("first Name Required")
        if(!lastName) errors.push("last Name Required")
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/) errors.push("vaid email is required")
        if(!Number.isFinite(gradelevel)) errors.push("grade level must be a number between 9 and 12")

        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

        return{
                firstName:capitalize(firstName),
                lastName:capitalize(lastName),
                email:email.toLowerCase(),
                gradelevel:gradelevel
        }

}

// Gen ID
function getID()
{

        return(Date.now().toString(36)+Math.random()+toString(36).slice(2,8).toUpperCase)

}

// add Student
export async function addStudent(input){

        const cleanData = dataValidation(input)

        const newStudent={
                id:Date.now().toString(36),
                ...cleanData,
                fullName: `${cleanData.firstName} ${cleanData.lastName}`,
                createdAt: new Date().toISOString()
        }

        const students = await listStudents()
        students.push(newStudent)
        await fs.writeFile(file, JSON.stringify(students,null,2), "utf-8")
        return newStudent
        
}