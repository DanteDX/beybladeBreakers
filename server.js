const express = require('express');
const connectDB = require('./config/db.js');

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server  is runnig on ${PORT}`));

app.get('/normal',(req,res)=> res.send('This is normal testing'));

app.use('/api/users',require('./routes/api/users.js'));
app.use('/api/auth',require('./routes/api/auth.js'));
app.use('/api/post',require('./routes/api/post.js'));
app.use('/api/profile',require('./routes/api/profile.js'));