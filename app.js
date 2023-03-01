const express = require('express')
const cors = require('cors')
const app = express();
let fruits = require('./fruits.json')


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Welcome to the fruitest API around, search with the url for now')
})

app.get('/fruits', (req, res) => {
    res.send(fruits)
} )

app.get('/fruits/:fruitName', (req, res) =>{
    let {fruitName} = req.params
    fruitName = fruitName.toLowerCase()
    //filter through fruits array and return fruit on match
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
    let fruitDoesntExist = true

    //looping through fruits array and updating existence variable if the fruit already exists
    for(let i=0;i<fruits.length;i++){
        if (fruits[i].name.toLowerCase() == newFruit.name.toLowerCase()){
            res.send('This fruit already exists')
            console.log("fruit exists")
            fruitDoesntExist = false
        }
    }
    //if the fruit exists, update fruits array and return 201 status with array
    if(fruitDoesntExist){
        console.log(`${newFruit.name} was added to the fruits array`)
        res.status(201).send(fruits)
        return fruits.push(newFruit)
    }
})

app.delete('/fruits', (req, res) => {
    const deleteFruit = req.body
    //filter fruits and return all fruits except for match, deleting match as a result
     newArray = fruits.filter((fruit) => {
        if(deleteFruit.name.toLowerCase() !== fruit.name.toLowerCase()){
            return fruit
        }
     })
    //if newArray is empty or the same length as fruit array then no change was made, fruit doesnt exist
     if(newArray.length == 0|| newArray.length == fruits.length){
        res.send("The fruit does not exist")
     } else {res.status(200).send(newArray)}    


     fruits = newArray
})

//patch request to be built
// app.patch('/fruits', (req, res) => {
//     const patchFruit = req.body
//    for(let i=0; i<fruits.length; i++){
//         if(patchFruit.name == fruits.name){
//             return i
//         }
//         return i
//     }
//     let objectArray = Object.entries(fruit[i])

//     for(let j=0;j<objectArray.length;j++){
//         if(objectArray[i][0] == patchFruit[1][0]){
//             objectArray[i] = 
//         }
//     }

// })

module.exports = app

