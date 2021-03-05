const CollectionTemplate = require("../models/collectionTemplate");

module.exports = {
  index,
  new: newEntry,
  show,
  edit,
  create,
  delete: deleteEntry,
};

async function index(req, res, next) {
    await CollectionTemplate.find({}, function(err, result){
        if(err){
            console.log(err);
            res.status(400);
        }else{
            res.render('my_db/index', {
                title: "MyDB - Index ",
                array: result,
            })
            
        }
    })
}

function newEntry(req, res, next) {
  res.render("my_db/new", { title: "MyDB - Index - New" });
}

async function show(req, res, next) {
    await CollectionTemplate.findById(req.params.id, function(err, result){
        if(err){
            console.log(err);
            res.status(400);
        }else{
            res.render('my_db/show', {
                title: "MyDB - Index ",
                entry: result,
            })
            
        }
    })
    
    
    
  res.render("my_db/show", {
    title: `MyDB - ${req.params.id}`,
  });
}
function edit(req, res, next) {
  res.render("my_db/edit", {
    title: `MyDB - ${req.params.id}- Edit`,
  });
}



async function create(req, res, next) {
  //convert checkbox input from  "ON"/"" to boolean true/false
  req.body.boolean_input = !! req.body.boolean_input;
  
  //convert textarea newlines into js newlines
  req.body.array_input = req.body.array_input.split('\r\n')
  
  
  const newEntry = new CollectionTemplate(req.body);
  await newEntry.save( function(err, success){
      if (err){
        console.log("Error: ",err)
        res.status(400)
      }else{
        console.log("Success:",result)
        res.redirect('/my_db');
      }
  })
}
function deleteEntry(req, res, next) {
  console.log("delete");
  res.end();
}
