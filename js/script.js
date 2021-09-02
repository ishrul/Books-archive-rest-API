document.getElementById("spinner").style.display = "none";
const BooksSec = document.getElementById("Books-sec");
const errorDiv = document.getElementById("error-msg");

// call the search button
loadBooks = () => {
  let searchText = document.getElementById("Books-input");
  let searchField = searchText.value;
  // clear dom
  BooksSec.innerHTML = "";

  if (searchField === "") {
    // set error message for empty string
    document.getElementById("total-result").textContent = "";
    document.getElementById("Books-sec").textContent = "";
    errorDiv.innerHTML = `
    <h3 class="text-danger text-center">Please enter a valid books name!!!</h3>
    `;
    return;
  }
  // turn on spinner
  document.getElementById("spinner").style.display = "block";
  // fatch the url
  const url = `https://openlibrary.org/search.json?q=${searchField}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.numFound === 0) {
        document.getElementById("error-msg").innerHTML = `
        <h3 class="text-danger text-center">Invalid book name. Please enter a valid book name!!!</h3>
    `;
      } else {
        errorDiv.innerHTML = "";
      }
      displayBooks(data);
    });
  // clear input field
  searchText.value = "";
};

// display all books
displayBooks = (data) => {
  console.log(data);
  const totalResult = document.getElementById("total-result");
  // totalResult.textContent = "";
  totalResult.innerHTML = `
  <h4 class="text-center my-5 text-primary">${data.numFound} Result Found </h4>
  `;
  console.log(data.numFound);
  // turn off spinner
  document.getElementById("spinner").style.display = "none";

  const documents = data.docs;
  const BooksSec = document.getElementById("Books-sec");
  documents.forEach((doc) => {
    const divOne = document.createElement("div");
    divOne.classList.add("col-lg-3");
    divOne.innerHTML = `
      <div class="card">
                <img src=" https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top image" alt="..." />
                <div class="card-body">
                  <h3 class="card-title">${doc.title}</h3>
                  <h6>Writer: ( ${doc.author_name} )</h6>
                  <p class="card-text">
                    Publisher: ${doc.publisher[0]}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">
                    First publish: ${doc.first_publish_year}
                    </small>
                  </p>
                </div>
      `;
    console.log(divOne);
    BooksSec.appendChild(divOne);
  });
};
