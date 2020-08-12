const express = require("express");
const app = express();
const morgan = require('morgan');

const postList = require('./views/postList');
const postDetails = require('./views/postDetails');

const client = require("./db/index");
const html = require("html-template-tag");

// middle ware
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/posts/:id", express.static(__dirname + "/public"));

// include the number of upvotes for each post 
app.get("/", async (req, res, next) => {
   try {
    // subquery or inner query to include upvotes from upvotes junction table (many-to-many relation).
    const postData = await client.query(`
         SELECT posts.*, counting.upvotes
         FROM posts
         INNER JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) AS counting
         ON posts.id = counting.postId; 
    `);

    const posts = postData.rows;

    const userData = await client.query('SELECT * FROM users');
    
    const authors = userData.rows;
    
    res.send(postList(posts, authors));
   }
   catch(err) {
     console.log(err.message);
     next(err);
   }
});

app.get("/posts/:id", async (req,res,next) => {
   try {
      const id = req.params.id;

      const data = await client.query(`
         SELECT posts.*, counting.upvotes
         FROM posts
         INNER JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) AS counting
         ON posts.id = counting.postId
         WHERE id=$1;
      `, [`${id}`]);
      
      // just one post in the array
      const post = data.rows[0];

      const userData = await client.query('SELECT * FROM users');
    
      const authors = userData.rows;
      
      res.send(postDetails(post, authors));
   }
   catch(err) {
      console.log(err);
      next(err);
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