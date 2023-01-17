const express = require('express');
const cors=require('cors');
const dbConnect = require('./dbConnect');

const app = express();
app.use(express.json());
const userRoute=require('./Routes/UsersRoutes');
const transactionsRoute=require('./Routes/TransactionsRoute');
app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionsRoute);
const port=5000;

app.get('/',(req,res) => res.send("hello world!"));
app.listen(port,() => console.log(`node js server started at port  ${port}!`));
