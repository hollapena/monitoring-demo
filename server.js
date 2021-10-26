const express= require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '072b2e6a1ff348d9af0aba716638d4c7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

let students = []

app.post('/api/student', (req,res) => {
    const {name} = req.body
    name = name.trim()
    students.push(name)
    rollbar.log('student added successfully', {author: 'Callie', type: 'manual entry'})
    res.status(200).send(students)
})

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

// Placement is important for the error handler...make sure it is below the body, but above the listener
app.use(rollbar.errorHandler()) 

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Rockin and rollin on ${port}`))