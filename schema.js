const mong = require('mongoose')

const user_login = new mong.Schema({
    user_id :{
        type : String ,
        unique : true ,
        required : true 
    },
    password : {
        type : String 
        // required : true 
    } , 

    age : {
        type : Number 
    },

    medical_history : {
        type : String 
    } ,
     
    city : {
        type : String
    } ,
    country : {
        type : String 
    },
    number : {
        type : Number
    },
    email : {
        type : String
    }
})

const time_availability = new mong.Schema({
    doctor_id : {
        type : String ,
        require : true
    },
    time : {
        type : String 
    } , 
    location : {
        type : String 
    },
    date : {
        type : String 
    }
})

const doc = new mong.Schema({
    doctor_id : {
        type : String
    } ,
    password : {
        type : String 
    },
    city : {
        type : String 
    } ,
    specialisation : {
        type : String 
    },
    phone_no : {
        type : Number
    }
})

const login_details = mong.model('user-details' , user_login)
const time_schedule = mong.model('Time-modules' , time_availability)
const doctor_details = mong.model('doctor-details' , doc)

// exporting the scehma
module.exports = {login_details , time_schedule , doctor_details}