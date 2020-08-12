const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

// find specific author name from authors array based on postId
function findAuthor(postId,authors) {   
   const authorObj = authors.find(el => {
      return el.id === postId;
   })

   return authorObj.name;
}

module.exports = (posts,authors) => {
  return (html `
  <!DOCTYPE html>
  <html> 
  <head>
    <title> Wizard News </title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div class="news-list">
      <header> <img src="./logo.png" /> Wizard News </header>
      ${posts.map(el => {
         return (`
           <div class="news-item">
             <p> 
               <span class="news-position">${el.id}</span>
               ${el.title}
               <small> (by ${findAuthor(el.id,authors)}) </small>
               <a href="/posts/${el.id}"> description </a>
             </p>
             <small class="news-info">
               ${el.upvotes} upvotes | ${timeAgo(el.date)}
             </small>
           </div>
         `);
      })}
    </div>
  </body>
  </html>
`);
}