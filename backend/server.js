

const express = require("express")

const app = express()

// middlewares


// routes
app.get("/", (req, res)=>{
    res.json({"msg":"welcome here"})
})


app.listen(9000, ()=>console.log("server connected"))