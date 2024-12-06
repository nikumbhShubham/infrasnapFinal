import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js';
import dailyReportRoutes from './routes/dailyReport.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to the datbase")
}).catch((err) => {
    console.log(err);
})
const app = express()
app.use(express.json())
// app.use(urlencoded({extended:false}))
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/reports', dailyReportRoutes);

app.use((err, req, res, next) => {   //has to be in correct order ---> (err, req, res, next)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })

})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})