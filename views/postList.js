const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

module.exports = posts => {
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
               <small> (by ${el.name}) </small>
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