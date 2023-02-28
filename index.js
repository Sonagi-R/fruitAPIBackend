require('dotenv').config()
const express = require('express')
const app = express();
let fruits = require('./fruits.json')

const port = process.env.PORT

app.use(express.json())

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to the fruitest API around, search with the url for now')
})

app.get('/fruits', (req, res) => {
    res.send(fruits)
} )

app.get('/fruits/:fruitName', (req, res) =>{
    let {fruitName} = req.params
    fruitName = fruitName.toLowerCase()


    const response = fruits.filter((fruit) => {
        if(fruitName.toLowerCase() == fruit.name.toLowerCase()){
            return fruit
        }
    })

    // res.send(response)
    if(response.length == 0){
        res.status(404).send("fruit not found")
    } else res.send(response[0])
})

app.post('/fruits', (req, res) => {
    const newFruit = req.body
    
    fruits.filter((fruit) => {
        if(newFruit.name.toLowerCase() == fruit.name.toLowerCase()){
            res.send("This fruit already exists")
            res.end()
        } 
     })

     console.log("new entry")

     fruits.push(newFruit)
            res.send(fruits)
})

app.delete('/fruits', (req, res) => {
    const deleteFruit = req.body

     newArray = fruits.filter((fruit) => {
        if(deleteFruit.name.toLowerCase() !== fruit.name.toLowerCase()){
            return fruit
        }
     })

     if(newArray.length == 0|| newArray.length == fruits.length){
        res.send("The fruit does not exist")
     } else {res.send(newArray) }    


     fruits = newArray
})

app.patch('/fruits', (req, res) => {
    const patchFruit = req.body
   for(let i=0; i<fruits.length; i++){
        if(patchFruit.name == fruits.name){
            return i
        }
    }

})


