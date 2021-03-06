const mongoose = require('mongoose');

//SCHEMA FOR SETUP ANSWER OF longText QUESTIONS 
let Answer = new mongoose.Schema({
    answerDate: { type: Date, default: Date.now },
    type: {type: String, lowercase: true, trim: true},
    question:{
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "question"
        },
        title: String,
        _id: String
     },
    answerString: String,
    answerNumber: Number,
    ResponseStart: Number,
    responseTime: Number,
    ResponseEnd: Number,
    responseTimebetween: [
        {
            type: Number
        }
    ],
    optionsText: [
        {
            type: String
        }
    ],
    optionsNumber: [
        {
            type: Number
        }
    ],
    whoAnswered: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("answer", Answer);