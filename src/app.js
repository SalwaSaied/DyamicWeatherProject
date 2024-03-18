

    const express = require('express')
    const app = express()

    const port = process.env.PORT || 3000

    
    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')
    app.use (express.static (publicDirectory))



app.set('view engine', 'hbs');

 const viewsDirectory = path.join (__dirname , '../temp1/views')
 app.set('views', viewsDirectory);

 // to read partials : 
 var hbs = require('hbs');
const partialsPath = path.join(__dirname , "../Temp1/partials")
hbs.registerPartials(partialsPath)

 
app.get ('/' , (req,res) => {
    res.render('index' , {
        title : "Welcome",
        desc : "Enjoy Searching Weather Around The World from here:"
    })
})

app.get ('/service' , (req,res) => {
    res.render('service' , {
        title : "SERVICE",
        name: "Mohamed",
        city:"Cairo",
        age: 40,
        img1: "images/trainer-3.jpg"
    })
})


app.get ('/team' , (req,res) => {
    res.render('team' , {
        title : "TEAM",
        name: "reem",
        city:"mansoura",
        age: 25,
        img2: "images/trainer-2.jpg"
    })
})

///////use request.query in url
app.get('/products', (req,res)=>{
    console.log(req.query)
    console.log(req.query.model)
    res.send({
        product: "BMW"
    })
})

////weather project/////////////////////////// 
// app.get('/weather', (req,res)=>{
//   if(!req.query.adress){
   
//    return res.send({
//         error:"you must provide adress"      
//         }
//         )}
//         res.send({
//             location: req.query.adress,
//             forecast:'cold'
//         })
////////////////dynamic forecast

//step-1- require files
const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

//step-2- create the weather endpoint
app.get('/weather', (req,res)=>{
   
//     //handle error
    if(!req.query.adress){
              return res.send({
                error:"you must provide adress"      
                })
            }
            geocode(req.query.adress,(error,data)=>{
                if(error){
                    return res.send({error})
                }
                forecast(data.latitude, data.longtitude,(error, forecastData)=>{
                    if(error){
                        return res.send({error})
                    }
                    res.send({
                        forecast:forecastData,
                        location:req.query.adress
                    })
                })
            })
})


//////////////////////////////










/////////////////////////////////////////////////////
app.get ('*' , (req,res) => {
    res.send('404 error page not found')
})


  

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////


