
const express=require('express');

const path=require('path');
const exphbs=require('express-handlebars')

const looger = require('./middleware/looger')
const members = require('./Member');

const app = express();




/*
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.htm l'));
})*/


//init middleware
//app.use(looger);

//Body middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//HandleBar Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//Homepage route
app.get('/', (req, res) =>
    res.render('index', {
        title: 'Member App',
        members
    })
);

app.use('/api/members',require('./router/api/members'));


//Set Static Folder
app.use(express.static(path.join(__dirname,'public')))

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));