const mongoose = require('mongoose');

mongoose.connect('mongodb://technologics-server:hd4a9UriDrebEAnhxNvWpLdDnUpiSFaiCXTJ4R6wXF54cHkIiCGbvsXZK666gHrsoBa3Tqrwjs3QACDbICwNHA==@technologics-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@technologics-server@',{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true

})
