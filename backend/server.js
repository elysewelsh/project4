import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './config/connection.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express()

const port = process.env.PORT || 3000

app.use(cors(
    // { origin: ['netlify','localhost']}
))
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/', taskRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World! -Pro-Tasker')
})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`))