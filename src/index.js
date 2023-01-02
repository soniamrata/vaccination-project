const expres = require("express")
const app= express()
const mongoose = require("mongoose")
const route = require("./routes/route.js")

app.use(express.json())
mongoose.set("strictQuery", true)

mongoose.connected("",{useNewUrlParser:true})
.then(()=> console.log("mongoDB connected"))
.catch((err)=> console.log(err))

('/',route)

app.listen(port, function(){
    console.log("express app is running on port 3000")

})