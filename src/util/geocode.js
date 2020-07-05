const request = require('request')
const geoCode = (address,callback) => {
    url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Fha2V0aCIsImEiOiJja2MxdGIzaTYxd2w4MnlwNzczZHU4aTNqIn0.2t2aOF86duAFSnWDTrZZNQ'
    request({url ,json:true},(error,{body}) => 
    {
        if(error){
            callback('unable to connect',undefined)
        }
        else if(body.features.length == 0)
        {
            callback('Incorrect arguments try again',undefined)
        }
        else{
            callback(
                undefined,{
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name
                }
            )
        }
    })

}
module.exports = geoCode