
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    
    title:{ type: String, required: true },
    description: {type: String, required: true, unique: true},
    tag:{type: String, default: 'General'},
    date:{type: Date, default: Date.now},
    due: {type: String, default: "Date.now", required: true}
});

module.exports= mongoose.model('task', TaskSchema)