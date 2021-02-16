const request = require("postman-request")

const forecast = (latitude,longitude,callback) =>{
        const url = 'http://api.weatherstack.com/current?access_key=3e18737deecf079aad416d5cdbd7f801&query='+ latitude + ',' + longitude
        request({url,json:true},(error,{body}={})=>{
            if(error){
                callback("Unable to make request! Please check internet connectivity",undefined)
            }else if(body.error){
                callback(body.error.info,undefined)
            }else {
                callback(undefined,'Your current location is ' + body.location.name + ' & your temperature is ' + body.current.temperature  + ' but it feels like ' + body.current.feelslike)
            }

        })
}

module.exports = forecast