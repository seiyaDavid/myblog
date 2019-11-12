if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

// Set the view engine
app.set('view engine', 'ejs')

// set where the views will be saved in
app.set('views', __dirname + '/views')

// mostly will contain the file(html) that has the header and footer
app.set('layout', 'layouts/layout')

app.use(expressLayouts)

// location for static files
app.use(express.static('public'))

// Database setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter)
app.listen(process.env.PORT || 3000)