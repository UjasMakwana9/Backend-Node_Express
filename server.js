import express from 'express'

const app = express()
app.use(express.json())
const localhost = "127.0.0.1"
const port = 9991

// Simple fetch request
app.get('/',(req,res)=>{
    console.log(req.url);
    res.send("This is get request")
})

// For all urls 
// app.get('/*',(req,res)=>{
//     console.log(req.url);
//     res.send("Maro Bhai aya hhu avyo")
// })
let index = 1;
let arr = [];

// To add data in a array 
app.post('/teas',(req,res)=>{
    // console.log(req.body);
    // const {name,price}=req.body;
    const {order} = req.body

    for (const element of order) {
        const item = {id:index++,name : element["name"],price :element["price"]};
        console.log(item);
        arr.push(item);        
    }
    // res.send("this is the post request")
    res.status(201).send(order)
})

// To fetch all tea
app.get('/getTeas',(req,res)=>{
    console.log(arr);
    res.status(200).send(arr)
})

// To fetch a particular tea
// http://127.0.0.1:9991/getOneTea/3 url works in this pattern
app.get('/getOneTea/:id',(req,res)=>{
    // const {index} = req.body;

    const index = parseInt(req.params.id);
    console.log(index);

    const value = arr.find(itr => itr.id === index)
    console.log(value);
    if(!value)
       return res.status(404).send("No such index")
    else    
        res.status(200).send(value);
    
    // Other way
    // const index = parseInt(req.query.id);
    // console.log(index);
    
    // const value = arr.find(itr =>  itr.id === index)
    // console.log(value);
    // if(!value)
    //    return res.status(404).send("No such index")
    // else    
    //     res.status(200).send(value);
})

// Update Operation
app.put('/editDetails/:id',(req,res)=>{
    const index = parseInt(req.params.id);
    const value = arr.find(itr => itr.id === index)
    if(!value)
        res.status(404).send("No such index")
    else    
    {
        const {name,price}=req.body

        value.name = name;
        value.price = price;

        res.status(200).send(value);
    }
})
// Deleting the value
app.delete('/deleteData/:id',(req,res)=>{
    const index = arr.findIndex(itr => itr.id === parseInt(req.params.id))
    if(index === -1)
        return res.status(404).send("No such index exists")
    else
    {
            const value = arr[index];
            arr.splice(index, 1)
            res.status(200).send(value);
            res.status(200).send(`was deleted`);
        }
})



app.listen(port,localhost,()=>{
    console.log(`Server is running... http://${localhost}:${port}"`)
    
})