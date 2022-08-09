



const mongoose = require('mongoose')
const { Schema } = mongoose;
const moment = require('moment')

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    team: {
        type: String,
        require: true
    },
    products: {
        type: String,
        require: true
    },
    problem: {
        type: String,
        require: true
    },
    solution: {
        type: String,
        require: true
    },
    proPosition: {
        type: String,
        require: true
    },
    competetors: {
        type: String,
        require: true
    },
    revenueModel: {
        type: String,
        require: true
    },
    market: {
        type: String,
        require: true
    },
    
    
    potentialSize: {
        type: String,
        require: true
    },
    need: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default:'pending'
    },
    userId: {
        type: String,
    },
    createdAt : {
        type:String,
        default:moment().format("DD-MM-YYYY")
    },
    bookingStatus: {
        type: Boolean,
        default:false
    },
    
})
const applicationModel = mongoose.model("applications", applicationSchema)
module.exports = applicationModel;