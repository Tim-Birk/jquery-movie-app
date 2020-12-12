// global variables
let movies = [
  {
    rank: 1,
    name: "Almost Famous",
    rating: 10,
  },
  {
    rank: 2,
    name: "Step Brothers",
    rating: 9,
  },
  {
    rank: 3,
    name: "Into the Wild",
    rating: 7,
  },
];
const thead = $("thead");
const tbody = $("tbody");
let movieSort = "descending";
let ratingSort = "descending";

// add a click listener to the sort icon in the table header
thead.on("click", "i", (e) => {
  const th = $(e.target.parentElement);
  // Determine which header column was clicked
  const prop = th.text().trim().toUpperCase();
  // Determine ascedning or descending sort type for given property
  let type;
  if (prop.toUpperCase() === "MOVIE") {
    type = movieSort;
    movieSort = movieSort === "ascending" ? "descending" : "ascending";
  } else {
    type = ratingSort;
    ratingSort = ratingSort === "ascending" ? "descending" : "ascending";
  }
  // get the newly sorted movies array based on sort criteria
  movies = getSortedArray(prop, type.toUpperCase());
  fillTable();
});

// add a click listener to the table body on each delete button to remove the parent row
tbody.on("click", "button", (e) => {
  const tr = $(e.target.parentElement.parentElement);
  const rank = tr.children("th").text();
  tr.fadeOut(200, () => {
    // remove movie from existing movies array
    removeMovie(Number(rank));
    // resort the array based on rating and reassign the ranks for each movie
    movies = getSortedArray("RATING", "ASCENDING").map((m, i) => ({
      ...m,
      rank: i + 1,
    }));
    fillTable();
  });
});

// when the form is submitted create a new table row with the input values
$("form").on("submit", (e) => {
  e.preventDefault();
  const name = $("#movie");
  const rating = $("#rating");

  const movie = {
    name: name.val(),
    rating: Number(rating.val()),
  };
  // add new movie to existing movies array
  movies.push(movie);
  // resort the array based on rating and reassign the ranks for each movie
  movies = getSortedArray("RATING", "ASCENDING").map((m, i) => ({
    ...m,
    rank: i + 1,
  }));

  fillTable();

  name.val("");
  rating.val("");
});

const fillTable = () => {
  tbody.html("");
  const rows = movies.map((movie, i) => {
    const { rank, name, rating } = movie;
    return $(`<tr>
        <th scope="row">${rank}</th>
        <td>${name}</td>
        <td>${rating}</td>
        <td>
          <button type="button" class="btn btn-danger">Delete</button>
        </td>
        </tr>`);
  });
  tbody.append(rows);
};

const removeMovie = (rank) => {
  movies = movies.filter((m) => m.rank !== rank);
};

const getSortedArray = (prop, type) => {
  if (prop === "MOVIE") {
    if (type === "ASCENDING") {
      return movies.sort((a, b) => (b.name > a.name ? 1 : -1));
    } else {
      return movies.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  } else if (prop === "RATING") {
    if (type === "ASCENDING") {
      return movies.sort((a, b) => (b.rating > a.rating ? 1 : -1));
    } else {
      return movies.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    }
  }
  return movies;
};

// when the DOM is finished loading
$(fillTable());
