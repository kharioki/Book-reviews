// sample data
var data = [
  {
    "id": 1,
    "text": "book was full of fluff",
    "rating": 4
  },
  {
    "id": 2,
    "text": "book was fluff",
    "rating": 3
  },
  {
    "id": 3,
    "text": "book was amazing",
    "rating": 4
  },
];

// Create a list of reviews when the page loads
function listReviews() {
  data.forEach(function (item) {
    console.log({ item });
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

  return average.toFixed(1);
}

var averageRating = document.createElement("p");
averageRating.className = "average";
var averageRatingText = document.createTextNode(calculateAverage());
averageRating.appendChild(averageRatingText);

var ratingStar = document.createElement("SPAN");
var ratingCountText = calculateAverage();
ratingStar.className = "stars";
ratingStar.style = `--rating: ${ratingCountText};`;

// append average rating to page
var av = document.getElementById("average");
av.appendChild(averageRating);
av.appendChild(ratingStar);

// create a new review
function createReview() {
  var rating = document.getElementById("myRating").value;
  var review = document.getElementById("myReview").value;
  var newReview = {
    id: data.length + 1,
    text: review,
    rating: Number(rating),
  };
  data = [...data, newReview];
  listReviews();
  document.getElementById("myRating").value = "";
  document.getElementById("myReview").value = "";
}