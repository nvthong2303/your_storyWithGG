const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        reuired: true
    },
    body: {
        type: String,
        reuired: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Story', StorySchema)