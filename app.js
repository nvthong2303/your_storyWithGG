// const express = require('express')
// const dotenv = require('dotenv')
// const morgan = require('morgan')
// const exphbs = require('express-handlebars')
// const path = require('path')
// const passport = require('passport')
// const mongoose = require('mongoose')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')
// const connectDB = require('./config/db')
// const methodOverride = require('method-override')
// const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

// const app = express()

// //load config
// dotenv.config({ path: './config/config.env' })

// //passport config
// require('./config/passport')(passport)

// //connect db
// connectDB()

// //logging
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
// }

// //body parser
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// //static folder
// app.use(express.static(path.join(__dirname, 'public')))

// //method override 
// app.use(methodOverride((req, res) => {
//     if(req.body && typeof req.body === 'object' && '_method' in req.body) {
//         let method = req.body._method
//         delete req.body._method
//         return method
//     }
// }))

// //handlebars
// app.engine(
//     '.hbs',
//     exphbs({
//       helpers: {
//         formatDate,
//         stripTags,
//         truncate,
//         editIcon,
//         select,
//       },
//       defaultLayout: 'main',
//       extname: '.hbs',
//     })
//   )
//   app.set('view engine', '.hbs')

// //sessions
// app.use(
//     session({
//         secret: 'keyboard cat',
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGO_URI
//         })
//     })
// )

// //passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// //routes
// app.use('/', require('./routes/index'))
// app.use('/auth', require('./routes/auth'))
// app.use('/stories', require('./routes/stories'))


// const PORT = process.env.PORT || 5000

// app.listen(PORT, console.log(`server is running ${process.env.NODE_ENV} mode on port ${PORT}`))
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
