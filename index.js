const bodyParser = require('body-parser')
const ex = require('express')
const mong = require('mongoose')
const cor = require('cors')
const {login_details , time_schedule ,doctor_details} = require('./schema.js')

//making execution space
const run = ex()
run.use(bodyParser.json())
run.use(cor({credentials:true, origin:'http://localhost:5173'}));

//creating db connection :  
async function connect_to_db(){
    try{
        await mong.connect('mongodb+srv://admin:root123@cluster1.7yc15ak.mongodb.net/health_care?retryWrites=true&w=majority&appName=Cluster1')
        const port = 8000 || process.env.PORT 
        run.listen(port , function(){
            console.log('listening at port : ' + port)
        })
    }
    catch(er) {
        console.log(er)
    }
}  

//to fetch doctor details
run.get('/get-doctordetails' , async function(request , response){
    try{
        const exp_data = await doctor_details.find()
        response.status(200).json(exp_data)
        console.log("done everything !")
        }
        catch(error) {
            response.status(500).json({
                "status" : "not connected" ,
                "context" : "entry not available !"
            })
        }
})

//to add doctor details 
run.post('/doctor-login' , async function(request , response){
    try{
        console.log("2")
        await doctor_details.create({
            "doctor_id"  : request.body.doctor_id , 
            "password" : request.body.password ,
            "city" : request.body.city ,
            "specialisation" : request.body.specialisation,
            "phone_no" : request.body.phone_no
        })
        response.status(200).json({
            "status"  : "success" , 
            "content " : "added"
        })
    }
    catch(er){
        response.status(500).json({
            "status" : "failure" , 
            "content" : "corrupted" ,
            "error" : er
        })
    }
})

run.delete('/delete-time/:id' , async function(request , response){
    try{
        const to_edit = await time_schedule.findById(request.params.id)
        if(to_edit){
            await time_schedule.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "available"
            })
        }
        else{
            response.status(500).json({
                "status" : "available !"
            })
        }
     }
     catch(error){
        response.status(500).json({
            "status" : "error" ,
            "error" : error
        })
     }
})

//to fetch-time data from db
run.get('/get-time' , async function(request , response){
    try{
        const exp_data = await time_schedule.find()
        response.status(200).json(exp_data)
        console.log("done everything !")
        }
        catch(error) {
            response.status(500).json({
                "status" : "not connected" ,
                "context" : "entry not available !"
            })
        }
})


//to create or book apoinments
run.post('/create-time' , async function(request , response){
    try{
        console.log("15")
        await time_schedule.create({
            "doctor_id" : request.body.doctor_id,
            "time" : request.body.time ,
            "location" : request.body.location ,
            "date" : request.body.date
        })
        response.status(200).json({
            "status" : "success" ,
            "content" : "created"
        })
    }
    catch(er){
        response.status(500).json({
            "status" : "failure" , 
            "content" : "corrupted" ,
            "error" : er
        })
    }
})

//feth user from db
run.get('/get-user' , async function(request , response){
    try{
        const data = await login_details.find()
        response.status(200).json(data)
        console.log("done everything !")
        }
        catch(error) {
            response.status(500).json({
                "status" : "not connected" ,
                "context" : "entry not available !"
            })
        }
})

// to add user
run.post('/signup' , async function(request , response){
    try{
        console.log("444444444444444")
        await login_details.create({
            "user_id"  : request.body.user_id , 
            "password" : request.body.password , 
            "medical_history" : request.body.medical_history ,
            "city" : request.body.city , 
            "country" : request.body.country ,
            "number" : request.body.number ,
            "email" : request.body.email 
        })
        response.status(200).json({
            "status"  : "success" , 
            "content " : "added"
        })
    }
    catch(er){
        response.status(500).json({
            "status" : "failure" , 
            "content" : "corrupted" ,
            "error" : er
        })
    }

})

// to delete
run.delete('/delete-user/:id' , async function(request , response){
    try{
        const to_edit = await login_details.findById(request.params.id)
        if(to_edit){
            await login_details.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "available"
            })
        }
        else{
            response.status(500).json({
                "status" : "available !"
            })
        }
     }
     catch(error){
        response.status(500).json({
            "status" : "error" ,
            "error" : error
        })
     }
})

//to edit
run.patch('/edit-user/:id' , async function(request , response){
    try{
        // console.log('3')
        const new_data = login_details.findById(request.body.id)
        try{
            if(new_data){
                await new_data.updateOne({
                    "user_id"  : request.body.user_id , 
                     "password" : request.body.password , 
                     "age" : request.body.age,
                     "medical_history" : request.body.medical_history ,
                     "city" : request.body.city , 
                     "country" : request.body.country ,
                     "number" : request.body.number ,
                     "email" : request.body.email 
                })
                response.status(200).json({
                    "status" : "updated !"
                })
            }
        }
        catch(error){
            response.status(500).json({
                "status" : "error4" , 
                "error" : error 
            })
        }
    }
    catch(error){
        response.status(500).json({
            "status" : "error !" ,
            "error" : error
        })
    }
})


connect_to_db()