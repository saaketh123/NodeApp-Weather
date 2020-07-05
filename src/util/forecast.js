const request = require('request')
const forecast = (latitude,longitude,callback) => {
    url  = 'http://api.weatherstack.com/current?access_key=40667a74683042ecb1c06ed6e9d9fb30&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({ url ,json:true},(error,{body}) => 
    {
        if(error){
            callback('unable to connect',undefined)
        }
        else if(body.error)
        {
            callback('Incorrect arguments try again',undefined)
        }
        else{
            callback(
                undefined,{
                    Temperature : body.current.temperature,
                    Name : body.location.name,
                    Region : body.location.region,
                    Country : body.location.country
                }
            )
        }
    })

}
module.exports = forecast