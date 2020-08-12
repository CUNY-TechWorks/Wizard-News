const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

// find specific author name from authors array based on postId
function findAuthor(postId,authors) {   
  const authorObj = authors.find(el => {
     return el.id === postId;
  })

  return authorObj.name;
}

module.exports = (post, authors) => {
  return (html `<!DOCTYPE html>
    <html> 
    <head>
      <title> Wizard News </title>
      <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
      <div class="news-list">
        <header> <img src="./logo.png" /> Wizard News </header>
        <div class="news-item">
             <p> 
               <span class="news-position">${post.id}</span>
               ${post.title}
               <small> (by ${findAuthor(post.id, authors)}) </small>
               <a href="/"> home </a>
             </p>
               <small class="news-info">
                 ${post.upvotes} upvotes | ${timeAgo(post.date)}
               </small>
             <p>
               ${post.content}
             </p>
         </div>
       </div>
    </body>
    </html> `);
}