const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    videoId : {
        type : Schema.Types.ObjectId,
        ref : 'Video'
    },
    movieId :{
        type : String
    },
    responseTo : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    content : {
         type : String        
    },
}, {timestamps : true})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }