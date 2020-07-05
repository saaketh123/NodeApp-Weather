const express =  require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./util/geocode')
const forecast = require('./util/forecast')
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const partials = path.join(__dirname,'../views/partials')
const port = process.env.PORT || 300
hbs.registerPartials(partials)
app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))
app.get('',(req,res) => {
    res.render('weather',{
        tittle : 'Main page',
        name : 'Saaketh'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        tittle : 'About',
        name : 'Saaketh'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpText : 'This is a assisting site',
        tittle : 'About',
        name : 'Saaketh'
    })
})

app.get('/Weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error : 'Please provide an input'
            
        })
    }
    geoCode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error)  {
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,{Temperature,Region = 'Not available',Name,Country}={})=>{
            if(error)  {
                return res.send({ error })
            }
            res.send({
                name : Name,
                Region : Region,
                country : Country,
                temparature : Temperature
            })
            //console.log(Name,Region,Country)
          //  console.log(Temperature+' degree celsius')
          })
        })
    
   /* res.send([
        {
            forecast : 'windy',
            location: 'hyderabad',
            address : req.query.address
        },
    
    ])*/
})
app.get('/help/*',(req,res) => {
    res.render('errorhelp',{
        name: 'saaketh',
        tittle : 'Page Error'
    })
} )

app.get('*',(req,res) => {
    res.render('error',{
        name: 'saaketh',
        tittle : 'Page Error'
    })
} )


app.listen(port,() => {
    console.log("It's up on port " + port)
})