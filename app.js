const express = require("express");
const app = express();
const morgan = require('morgan');

const { client } = require("./db/index");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const html = require("html-template-tag");

// middle ware
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/posts/:id", express.static(__dirname + "/public"));
// 

app.get("/", async (req, res, next) => {
   try {
    const data = await client.query(`SELECT * FROM posts`);
    
    res.send(postList(data.rows));
   }
   catch(err) {
     next(err);
   }
});

app.get("/posts/:id", (req,res,next) => {
   const id = req.params.id;
   const post = postBank.find(id);
  
   if(!post.id) {
     next(new Error('A 404 error'));
   }
   else {
     res.send(postDetails(post));
   }
});

// error handler
app.use((err, req, res,next) => {
   res.status(404);
   
   res.send(html `<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
         <header><img src="/logo.png"/>Wizard News</header>
         <div class="not-found">
           <p>Accio Page! 🧙 ... Page Not Found</p>
         </div>
      </body>
   </html>`
  );
});
//

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});