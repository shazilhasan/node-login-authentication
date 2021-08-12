const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/loginAuth',{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true

})