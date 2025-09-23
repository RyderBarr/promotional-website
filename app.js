const express = require('express')
const path = require('path')
const app = express()

// mis=ddleware to seve static files()
// middleware is a function thay sits berwenn the request from the client and the response frim the server
// think of it as a gatekeepr or pipeline every request passes through a chain of middleware function before reaching the final route

app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res)=>{res.sendFile(path.join(__dirname, 'public', 'index'))})

app.get((req,res)=>{
    res.sendFile(path.join(__dirname,'public','404.html'))
})

app.listen(5000,()=>{console.log(`server is running on http://localhost:5000`)})
