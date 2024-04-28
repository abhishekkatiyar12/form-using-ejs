const mongoose= require('mongoose');
const express=require('express');
const app= express();
const path= require('path');

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

const userSchema=new mongoose.Schema({
    f_name:{
        type:String,
        required:true,
    },
    l_name:{
        required:true,
        type:String,
    },
    age:{
        type:Number,
    },
    details:{
       type:String,
    }
})

const userModel =mongoose.model('forms',userSchema);


app.get('/',(req,res)=>{

// if we want to send index.ejs file then we should follow this 

    res.render('index');


  //   this shoud be followed 
  // in case of sending the static html file it should be kept in public folder
  
     // res.sendFile(path.join(__dirname, 'public', 'index.html'));
    
})

const addUser=async (req,res)=>{
  console.log(req.body);
  try {
      const { f_name, l_name, age,details } = req.body;
      console.log(req.body)

      const newUSer = new userModel({ f_name, l_name, age,details });
      
      await newUSer.save();
      // res.render('index',{files:files});
      res.render('savedDetails',{f_name:req.body.f_name,l_name:req.body.l_name,age:req.body.age,details:req.body.details});
      
      // res.redirect('/');
     
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        status: "error",
      });
    }
  }

app.post('/add', addUser);






const url='mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.5mzncy3.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0'
const databaseUser='abhishekkatiyar';
const databasePassword='Abhishek123';
const databaseName='form-data';

let dbLink=url.replace("$_USERNAME_$",databaseUser);
dbLink=dbLink.replace("$_PASSWORD_$",databasePassword);
dbLink=dbLink.replace("$_DB_NAME_$",databaseName);

mongoose.connect(dbLink)
  .then(() => console.log('Database Connected!'));




app.listen(8000);