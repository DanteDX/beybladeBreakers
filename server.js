const express = require('express');
const connectDB = require('./config/db.js');
const path = require('path');

const app = express();
connectDB();
app.use(express.json({extended:false}));
// app.get('/normal',(req,res)=> res.send('This is normal testing'));

app.use('/api/users',require('./routes/api/users.js'));
app.use('/api/auth',require('./routes/api/auth.js'));
app.use('/api/posts',require('./routes/api/post.js'));
app.use('/api/profile',require('./routes/api/profile.js'));

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server  is runnig on ${PORT}`));