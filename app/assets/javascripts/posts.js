// document ready
$(() => {
  bindClickHandlers()
})

// function expression
const bindClickHandlers = () => {
  // on takes in the event that you want to listen
  // for
  // the sencond argument is the call back function that
  // you want to run when that function happens it takes in
  // an event object (e) as its parameter
  // we can prevent the default behavior when this
  // link is clicked because the defult behavior
  // when this is clicked is that it is going to render
  // via rails that html markup
  // so we want to prevent that default by
  $('.all_posts').on('click', (e) => {
    e.preventDefault()
    history.pushState(null, null, "posts");
    // whenever this button is clicked we want to make a call to our backend api/ server
    // console.log('hello')
    // whenever you call fetch you get back a promise
    // and that promise will be either resolved or regected
    // in most cases because we are writing our back end api
    // it is going to be resolved. Whenever a promise is resolved with a
    // value you can tag on a method called .then

    getPosts() // we are making a call to our `/posts.json` backend api endpoint


  })
// because the class show_link is not getting added until we click on
// our posts link it is not read into the dom.... soo we need to choose a parent
// that we have this on click handler as a second argument. Any current or future .show_link
// classes attach this 'click' handler to
  $(document).on('click', ".show_link", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    let id = $(this).attr('data-id')
    //make a call to out api end point
    //we want to get the data id and reference that id
    fetch(`/posts/${id}.json`)
    .then(res => res.json())
    .then(post => {
      let newPost = new Post(post)

      let postHtml = newPost.formatShow()

      $('#app-container').append(postHtml)
    })
  })
}

const getPosts = () => {
  fetch(`/posts.json`)
  // the then takes in an actual responce
  .then(res => res.json())
  // res - is a responce object and use .json()
  // to get the data we want we need to return that responce and call the .json method
  // what this will do is it will take that responce and
  // convert it responce and extract the data  that we want  and pass it  on to the
  // next then call
  .then(posts => {// data an array
    // iterating over the object we get back
    // when we click on posts lets clear the app-container
    $('#app-container').html('')
    posts.forEach(post => {
      //new use the responce that I get back from my server and utilize a javascript model object
      // either with a constructor function or es6 classes
      let newPost = new Post(post)
      // we created a new post object we can call this paticular method on that prototype. Every instance of post has
      // the ability to call the formatIndex method on the prototype
      let postHtml = newPost.formatIndex()
      // postHtml is a html markup
      //we are appending that to #app-container
      $('#app-container').append(postHtml)
    })
  })

  $(document).on('click', 'next-post', function() {
    // make a call to our backend api endpoint
    let id = $(this).attr('data-id')
    fetch(`posts/${id}/next`)
  })

/*ajax

  // if you just use ajax for jquery then
    // it takes in one argument of an object
    // with a number of different properties
  // $.ajax({
  //   method: 'get',
  //   url: '/posts.json',
  //   success: function(data){
  //     console.log(data)
  //   }
  // })

  */
}

function Post(post) {
  //assign those values using the `this` keyword
  this.id = post.id
  this.title = post.title
  this.content = post.content
  this.user = post.user
  this.comments = post.comments

}

// which ever object makes a call to this method we have a reference to that objects attributes
// the way we reference that objects attributes is that we using the this keyword
Post.prototype.formatIndex = function(){
  let postHtml = `
    <a href="/posts/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.title}</h1></a>
  `
  return postHtml
}

Post.prototype.formatShow = function(){
  let postHtml = `
  <h3>${this.title}</h3>
  <button class="next-post">Next</button>
  `
  return postHtml
}

/* summery: we call fetch we get back a promise
we handle that promise with .then
we get back the responce inside this then call back
then we call .json on the responce
it will parse the data from the responce and
return it on to the next .then with data as the argument to its call back
*/

/*
normal convention when using the fetch api:
1. you make a call to what ever backend api endpoint using fetch
2. then you handle that first promise responce by calling .json() on what ever the res varible it is
3. then you get back the data in the next .then
*/

/*
fetch = a native api to the browser.
js method that makes api call
*/

/*
click on it
re-paints the dom
call my backend api server
returns that json

*/
