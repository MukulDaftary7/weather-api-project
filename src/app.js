const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
//app.use(express.static)
console.log(__dirname)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name:'mukul',
        surname:'daftary'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        about:'information about the creator',
        name : 'mukul daftary'
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help : 'this is help page',
        name:'mukul daftary'
    })

})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send('please provide address')
        return
    }
   //console.log(req.query)

    // res.send({forecast:'23.5 celcius',
    // location:'indore',
    // address : req.query.address})

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        //console.log('error',error)
        if(error){
          return res.send({error})
        }
        //console.log('data',data)
        forecast(latitude,longitude, (error, forecastdata) => {
          if(error){
            return res.send({error})
          }
          
          res.send({
              forecast:forecastdata,
              location:location,
              address:req.query.address
          })
      })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error : 'help page not found',
        name:'mukul daftary'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error : '404 page not found',
        name:'mukul daftary'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})