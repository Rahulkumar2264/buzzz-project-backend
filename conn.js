const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://Rahul:12345@sbs.r4riy.mongodb.net/formApi?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost/buzzzproject')

mongoose.connection.on('error', (err) => {
    console.log('connection failed');
})
mongoose.connection.on('connected', () => {
    console.log('succesfully connected to database');
})