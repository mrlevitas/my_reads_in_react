import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class AddBook extends Component {

  state = {
    query: '',
    searchResults: []
  }

  resetState = () => {
    this.setState({
      searchResults: [],
      query: ''
    })
  }

  updateQuery = (query) => {
    let trimQuery = query.trim()
    let currState = this.props.currState

    if (trimQuery !== '') {
      BooksAPI.search(trimQuery, 20)
        .then(response => {

          if (response.error) {
            throw(response.error);
          } else {
            let refinedResponse = response.map(book =>{
              // check if search results are already in our shelves
              let currentlyReading = currState.currentlyReading.filter( (b) => b.id === book.id)
              let read = currState.read.filter( b => b.id === book.id)
              let wantToRead = currState.wantToRead.filter( b => b.id === book.id)

              if (currentlyReading.length !== 0 ) {
                book.shelf = 'currentlyReading'
              }
              if (read.length !== 0 ){
                book.shelf = 'read'
              }
              if (wantToRead.length !== 0 ){
                book.shelf = 'wantToRead'
              }
              return book
            })

            this.setState({
              searchResults: refinedResponse,
              query: trimQuery
            })
          }
        })
        .catch(error => {
          console.log(`${error}`);
          this.resetState();
        })
    } else {
      this.resetState();
    }

  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(e) => this.updateQuery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.searchResults && (
            <BookShelf books={this.state.searchResults} header="Search" onShelfSelect={this.props.onBookSelect}/>
          )}
        </div>
      </div>
    )
  }
}

export default AddBook
