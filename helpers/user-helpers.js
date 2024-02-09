var db=require('../config/connection')
var collection =require('../config/collection')
const bcrypt=require('bcrypt')
var objectId=require('mongodb').ObjectId
module.exports={
    doRegister:(userData)=>{
        console.log(userData)
        return new Promise(async(resolve, reject) => {
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
            })
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve, reject) => {
            let loginStatus=false
            let response={}
            let user=await
            db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('logged')
                        response.user=user
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log('failed')
                        resolve({status:false})
                    }
                })
            }else{
                console.log('failed')
                resolve({status:false})

            }
        })
    },addReview:(review,callback)=>{
        
        db.get().collection(collection.USER_REVIEW).insertOne(review).then((data)=>{
            console.log(data)
            callback(data.insertedId)
            
        })
    
    },getAllReviews:()=>{
        return new Promise(async(resolve,reject)=>{
            let review=await db.get().collection(collection.USER_REVIEW).find().toArray()
            resolve(review)
        })
    },
    doReserve:(reserve)=>{
        return new Promise(async(resolve, reject) => {
            db.get().collection(collection.RESERVE_DETAILS).insertOne(reserve).then((data)=>{
                resolve(data.insertedId)
            })
        })

    },
    getAllReservation:()=>{
        return new Promise(async(resolve,reject)=>{
            let reserve=await db.get().collection(collection.RESERVE_DETAILS).find().toArray()
            resolve(reserve)
        })
    }
    

}