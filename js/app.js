const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    // clear data 
    searchField.value ='';
    if(searchText === '') {
        alert('Please Write Something');
    }
    else {
    // load data 
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data));
    }
}
const displaySearchResult = books => {
    document.getElementById('page').innerHTML = books.numFound;
    if(books.numFound > 0) {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img height="350px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Author: ${book.author_name.slice(0,4)}</p>
                <p class="card-text">Publisher: ${book.publisher.slice(0,3)}</p>
                <p class="card-text">Year: ${book.first_publish_year}</p>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
    }
    else{
        document.getElementById('no-result').innerHTML = `<h1 class="text-center bg-danger text-light">no result found please give valid book name</h1>`
    }
}