document.getElementById("spinner").style.display = "none";
/* const url = `http://openlibrary.org/search.json?q=javascript`;
fetch(url)
  .then((res) => res.json())
  .then((data) => displayBooks(data)); */
// call the search button
loadBooks = () => {
  let searchText = document.getElementById("Books-input");
  let searchField = searchText.value;

  // document.getElementById("books-display").textContent = "";

  const url = `https://openlibrary.org/search.json?q=${searchField}`;
  if (searchField === "") {
    // set error message for empty string
    document.getElementById("total-result").textContent = "";
    document.getElementById("books-display").textContent = "";
    document.getElementById("error-msg").innerHTML = `
    <h3 class="text-danger text-center">Please enter a valid books name!!!</h3>
    `;
  } else if (searchField.length > 0) {
    // turn of spinner
    document.getElementById("spinner").style.display = "block";
    // fatch the url
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBooks(data));
  }

  searchText.value = "";
};

// display all books
displayBooks = (data) => {
  const BooksSec = document.getElementById("Books-sec");
  BooksSec.textContent = "";
  const totalResult = document.getElementById("total-result");
  totalResult.textContent = "";
  totalResult.innerHTML = `
  <h4 class="text-center my-5 text-primary">${data.numFound} Result Found </h4>
  `;
  console.log(data.numFound);
  // turn off spinner
  document.getElementById("spinner").style.display = "none";

  if (data.numFound === 0) {
    // set error message for empty string
    document.getElementById("total-result").textContent = "";
    document.getElementById("books-display").textContent = "";
    document.getElementById("error-msg").innerHTML = `
    <h3 class="text-danger text-center">Invalid book name. Please enter a valid book name!!!</h3>
    `;
  } else if (data.numFound > 0) {
    const documents = data.docs;

    documents.forEach((doc) => {
      const div = document.createElement("div");
      div.classList.add("col-4");
      div.innerHTML = `
      <div class="card">
                <img src=" https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top image" alt="..." />
                <div class="card-body">
                  <h3 class="card-title">${doc.title}</h3>
                  <h6>Writer: ( ${doc.author_name} )</h6>
                  <p class="card-text">
                    Publisher: ${doc.publisher}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">
                    First publish: ${doc.first_publish_year}
                    </small>
                  </p>
                </div>
      `;
      console.log(BooksSec);
      BooksSec.appendChild(div);
    });
  }
};
