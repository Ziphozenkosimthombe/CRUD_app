const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
const app = express()

const connectionString = 'mongodb+srv://ziphozenkosi:Salvation22@cluster0.ysfsjei.mongodb.net/?retryWrites=true&w=majority'
app.use(cors)
//connecting to our database using the mongodb
MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database')
    //changing the name of the database
    const db = client.db('star-wars-quotes')
    //creating the collection before we can store items into a database by using the db.collection
    const quotesCollection = db.collection('quotes')
    //telling the express that we are using the EJS as a templete engine
    app.set('view engine', 'ejs')
    //use the body-parser to to get the value out from the form
    app.use(bodyParser.urlencoded({ extended: true }))
    //telling the server to read JSON by adding the 'body-parse' json middleware
    app.use(bodyParser.json())
    // telling the express to make the public folder accessible
    app.use(express.static('public'))

    //telling the express to serve on the index.html file that is in the root directory
    app.get('/', (req, res) => {
        //getting the quotes that we store in MongoDB with the 'find' method
        db.collection('quotes').find().toArray() // convert the data to the array
            .then(quotes => {
                // we render the index.html file using the ejs
                res.render('index.ejs', { quotes: quotes })
            })
            .catch(error => console.error(error))
    })
    // handling the post request with a post method using the express.
    app.post('/quotes', (req, res) => {
        // using the insertOne method to store items into MongoDB collection
        quotesCollection.insertOne(req.body)
            .then(result => {
                // console.log(results)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    // handling the PUT request with a put method
    app.put('/quotes', (req, res) => {
        // console.log(request.body)
        //the findOneAndUpdate let us find and change one item in the database
        quotesCollection.findOneAndUpdate(
                {name: 'ziphozenkosi'},
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    },
                },
                {
                    upsert: true, // force MongoDB to create a new Cebo Mthor quote if no ziphozenkosi quotes exist
                }
            )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))
    })

    //handling the event on the server with the delete method
    app.delete('/quotes', (req, res)=>{
        //to delete the from the mongodb collection we use method call 'deleteOne
        quotesCollection.deleteOne({name: req.body.name})
            .then(result =>{
                if (result.deletedCount === 0){
                    return res.json('No quote to delete')
                }
                res.json(`Deleted Cebo Mthor quote`)
            })
            .catch(error => console.error(error))
    })
    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`listining on Port ${PORT}`)
    })

  })
  .catch(error => console.error(error))