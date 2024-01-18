const express = require("express")
const app = express()
const cors = require("cors")
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5173' ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  };

app.use(express.json())

app.listen(3000,()=>{
    console.log("server is running");
    
})

app.use("/api/user",cors(corsOptions),userRouter )
app.use("/api/admin",cors(corsOptions),adminRouter )


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'
    
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
    })