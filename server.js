const express= require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '072b2e6a1ff348d9af0aba716638d4c7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html fil served successfully')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Rockin and rollin on ${port}`))