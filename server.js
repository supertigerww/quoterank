var express = require('express');

var app = express();                

var bodyParser = require('body-parser');

var validate = require('mongoose-validator')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static( __dirname + '/quoterankqpp/dist' ));

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apidb');

mongoose.Promise = global.Promise;

var path =  require('path');

var namevalidator=[
    validate({
        validator:'isLength',
        arguments:[3,50],
        message:'Author name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]

var quotevalidator=[
    validate({
        validator:'isLength',
        arguments:[3,100],
        message:'A quote should be between {ARGS[0]} and {ARGS[1]} characters',

    })
]

var AuthorSchema = new mongoose.Schema({
    name:{type:String,required:[true,'author name can not be blank'],validate:namevalidator},
    quotes:[{
        content:{type:String,validate:quotevalidator},
        vote:{type:Number,"default":0}
    }]
},{timestamps:true});
mongoose.model('Author',AuthorSchema)
var Author = mongoose.model('Author')

var x =new Author;
// x.name = 'test';
// x.quotes.push({content:'blah', vote: 3});
// x.quotes.push({content:'asdf', vote: 2});
// x.save()

app.get('/authors',function(req,res){
    Author.find({},function(err,authors){
        if(err){
            console.log(err);
            res.json({message:"Error",errors:err})
        }
        else{
            res.json({data:authors})
        }
    })
})

app.post('/authors',function(req,res){
    console.log(req.body);
    let name = req.body.name;
    Author.findOne({name:name},function(err,data){
        if(data){
            console.log(data);
            console.log(err);
            res.json({message:"ExistError",error:"This author already exists"})
        }else{
            var newauthor = new Author();
            newauthor.name = req.body.name;
            newauthor.save(function(err){
                if(err){
                    console.log(err);
                    res.json({message:"Error",errors:err})
                }
                else{
                    res.json({message:"Create Success"})
                }
            })
        }
    })
})

app.get('/authors/:authorid',function(req,res){
    Author.findById(req.params.authorid,function(err,author){
        if(err){
            console.log(err);
            res.json({message:"Error",errors:err})
        }
        else{
            res.json({data:author})
        }
    })

})

app.post('/quotes/:authorid',function(req,res){
    if(req.body.content.length < 3){
        res.json({message:"QuoteError",error:"A quote must contain at least 3 characters!"})
    }else{
        Author.update({_id:req.params.authorid},{$push:{quotes:req.body}},function(err,author){
            if(err){
                console.log(err);
                res.json({message:"Error",errors:err})
            }
            else{
                res.json({message:"Add quote success"})
            }
        })
    }
        
})

app.post('/upquote/:authorid/',function(req,res){
    Author.update({'quotes._id':req.body.id},{$inc:{'quotes.$.vote':1}},function(err,author){
        if(err){
            console.log(err);
            res.json({message:"Error",errors:err})
        }
        else{
            res.json({message:"upvote quote success"})
        }
    })
})

app.post('/downquote/:authorid/',function(req,res){
    Author.update({'quotes._id':req.body.id},{$inc:{'quotes.$.vote':-1}},function(err,author){
        if(err){
            console.log(err);
            res.json({message:"Error",errors:err})
        }
        else{
            res.json({message:"downvote quote success"})
        }
    })
})

app.post('/deletequote/:authorid',function(req,res){
    Author.update({_id:req.params.authorid},{$pull:{quotes:{_id:req.body.id}}},function(err,author){
        if(err){
            console.log(err);
            res.json({message:"Error",errors:err})
        }
        else{
            res.json({messasge:"delete quote success"})
        }
    })
})

app.put('/authors/:authorid',function(req,res){
    console.log(req.body);
    let name = req.body.name;
    Author.findOne({name:name},function(err,data){
        if(data){
            console.log(data);
            console.log(err);
            res.json({message:"ExistError",error:"This author already exists"})
        }else{
           Author.findOne({_id:req.params.authorid},function(err,author){
            if(err){
                console.log(err);
                res.json({message:"Error",errors:err})
            }else{
                author.name = req.body.name;
                author.save(function(err){
                    if(err){
                        console.log(err);
                        res.json({message:"Error",errors:err})
                    }else{
                        res.json({message:"Update Success"})
                    }
                })
            }
           })
        }
    })
})

app.delete('/authors/:authorid',function(req,res){
    Author.remove({_id:req.params.authorid},function(err,author){
        if(err){
            console.log(err);
            res.json({message:"Error",errors:err})
        }
        else{
            res.json({message:"Delete Success"})
        }
    })
})




app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./quoterankqpp/dist/index.html"))
  });



app.listen(8000,function(){
    console.log("listening on port 8000");
})

