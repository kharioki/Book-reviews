// vars
// const DB_URL = 'http://localhost:7777/';
const DB_URL = 'https://kiki-book-reviews.herokuapp.com/';

var data = [];
var mean = 1;

// Create a list of reviews when the page loads
function listReviews() {
  data.forEach(function (item) {
    var li = document.createElement("li");
    var t = document.createTextNode(`, ${item.text}`);
    var starSpan = document.createElement("SPAN");
    var ratingSpan = document.createElement("SPAN");
    var ratingText = document.createTextNode(item.rating);
    starSpan.className = "stars";
    ratingSpan.className = "num";
    starSpan.style = `--rating: ${item.rating};`;
    ratingSpan.appendChild(ratingText);
    li.appendChild(starSpan);
    li.appendChild(ratingSpan);
    li.appendChild(t);
    document.getElementById("bookReviews").appendChild(li);
  });
};

// calculate average book rating
function calculateAverage() {
  var total = data.reduce((acc, item) => acc + item.rating, 0);
  var average = total / data.length;
  mean = data.length ? average.toFixed(1) : mean;

  var averageRating = document.createElement("p");
  averageRating.className = "average";
  var averageRatingText = document.createTextNode(mean);
  averageRating.appendChild(averageRatingText);

  var ratingStar = document.createElement("SPAN");
  var ratingCountText = mean;
  ratingStar.className = "stars";
  ratingStar.style = `--rating: ${ratingCountText};`;

  // append average rating to page
  var av = document.getElementById("average");
  av.appendChild(averageRating);
  av.appendChild(ratingStar);
}

// create a new review
function createReview() {
  var rating = document.getElementById("myRating").value;
  var text = document.getElementById("myReview").value;
  addReview(text, rating);
  document.getElementById("myRating").value = "";
  document.getElementById("myReview").value = "";
}

// get reviews from backend
async function getReviews() {
  const req = JSON.stringify({
    query: `{
      reviews {
        id
        text
        rating
      }
    }`,
  });

  const response = await fetch(DB_URL, {
    method: 'POST',
    body: req,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  data = json.data.reviews;
  listReviews();
  calculateAverage();
}

// add reviews to backend
async function addReview(text, rating) {
  const query = JSON.stringify({
    query: `mutation {
      createReview(text: "${text}", rating: ${rating}) {
        id
        text
        rating
      }
    }`,
  });

  const response = await fetch(DB_URL, {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  res = json.data.createReview;
  data = [...data, res];
  // append new review to page
  var li = document.createElement("li");
  var t = document.createTextNode(`, ${res.text}`);
  var starSpan = document.createElement("SPAN");
  var ratingSpan = document.createElement("SPAN");
  var ratingText = document.createTextNode(res.rating);
  starSpan.className = "stars";
  ratingSpan.className = "num";
  starSpan.style = `--rating: ${res.rating};`;
  ratingSpan.appendChild(ratingText);
  li.appendChild(starSpan);
  li.appendChild(ratingSpan);
  li.appendChild(t);
  document.getElementById("bookReviews").appendChild(li);

  document.getElementById("average").removeChild(document.getElementById("average").childNodes[0]);
  document.getElementById("average").removeChild(document.getElementById("average").childNodes[0]);
  // calculate average rating
  calculateAverage();
}

// focus rating overlay on click
function focusRating() {
  var element = document.getElementById("rate");
  element.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}