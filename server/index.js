import express from 'express';

const app=express();
app.use(express.json());
const PORT=4578;


app.use('/',(req,res)=>{
    res.send('hello world!');
})

app.listen(PORT,()=>{
    console.log('app listening on port');
});
