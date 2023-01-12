const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = 8000
const TestModel = require('./models/schema')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING,
            {useNewUrlParser: true})
        console.log(`Connected to database: ${mongoose.connection.name}`)
    } catch (err) {
        console.log('Failed to connect', err)
    }
}

connectDB()

app.set('view engine', 'ejs') //Template for html utilizing JS
app.use(express.static('public')) //Connects main.js and style.css 
app.use(express.urlencoded({extended:true})) //returns middleware that only parses urlencoded bodies and onyl looks at requests where the Content-Type header matches the type option
app.use(express.json()) //helps express parse/read json data
app.use(cors()) 

app.get('/', async (req,res) => {
    try {
        //Get data from DB, after data is found pass the data to ejs and render it
        const content = await TestModel.find({})
        res.render('index.ejs',{contentKey: context})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})