const CollectionTemplate = require("../models/collectionTemplate");

module.exports = {
  index,
  new: newEntry,
  show,
  edit,
  update,
  create,
  delete: deleteEntry,
};

async function index(req, res, next) {
  
  try {
    let result = await CollectionTemplate.find({});
    res.render("my_db/index", {
      flash: req.flash(),
      title: "MyDB - Index ",
      array: result,
    });
  } catch (err) {
    res.render("error", {
      message: "my_db controller",
      error: err,
    });
  }
}

function newEntry(req, res, next) {
  res.render("my_db/new", { title: "MyDB - Index - New" });
}

async function show(req, res, next) {
  try {
    let result = await CollectionTemplate.findById(req.params.id);
    res.render("my_db/show", {
      flash: req.flash(),
      title: "MyDB - Show ",
      entry: result,
    });
  } catch (err) {
    res.render("error", {
      message: "my_db controller",
      error: err,
    });
  }
}
async function edit(req, res, next) {
  try {
    let result = await CollectionTemplate.findById(req.params.id);
    let resultObject = result.toObject();

    resultObject.date_input = convertDateyyyyMMdd(resultObject.date_input);
    resultObject.array_input = resultObject.array_input.reduce(
      (acc, cur) => acc + "\n" + cur
    );

    res.render(`my_db/edit`, {
      flash: req.flash(),
      title: "MyDB - Edit ",
      entry: resultObject,
    });
  } catch (err) {
    res.render("error", {
      message: "my_db controller",
      error: err,
    });
  }
}
//obviously this returns the date to acceptable HTML format
function convertDateyyyyMMdd(d) {
  date = new Date(d);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate() + 1;

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}

async function update(req, res, next) {
  try {
  //convert checkbox input from  "ON"/"" to boolean true/false
  req.body.boolean_input = !!req.body.boolean_input;

  //convert textarea newlines into js newlines
  req.body.array_input = req.body.array_input.split("\r\n");

  
    // const newEntry = await new CollectionTemplate(req.body);
    await CollectionTemplate.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Success: Updated Document")
    res.redirect(`/my_db/${req.params.id}`);
  } catch (err) {
    res.render("error", {
      message: "my_db controller",
      error: err,
    });
  }
}

async function create(req, res, next) {
 try{
    //convert textarea newlines into js newlines
  req.body.array_input = req.body.array_input.split("\r\n");

  //convert checkbox input from  "ON"/"" to boolean true/false
  req.body.boolean_input = !!req.body.boolean_input;

  const newEntry = new CollectionTemplate(req.body);
  await newEntry.save();
  req.flash("success", "Success: Created new Document");
  res.redirect("/my_db");
} catch (err) {
    req.flash("fail", "Error:"+err);
    res.redirect("/my_db");
}
}

async function deleteEntry(req, res, next) {
  try{
    await CollectionTemplate.findByIdAndRemove(req.params.id);
    req.flash("success", "Success: Deleted a Document")
    res.redirect("/my_db");
  } catch (err) {
    res.render("error", {
      message: "my_db controller",
      error: err,
    });
  }
}
