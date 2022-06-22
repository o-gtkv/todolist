require('dotenv').config()
const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const taskRouter = require('./routes/tasks')
const bodyParser = require('body-parser')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json())
app.use('/tasks', taskRouter)

app.get('/', async (req, res) => {
    res.render('home')
})

app.use((req, res) => {
    res.status(404)
    res.render('not_found')
})

app.use((err, req, res) => {
    console.error(err)
    res.status(500)
    res.render('internal_server_error')
})

mongoose.connect(process.env.DB_CONNECTION)

app.listen(app.get('port'), () => {
    console.log(`Applicatin listen on port ${app.get('port')}`)
})