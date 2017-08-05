import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
// import { Link } from 'react-router-dom'
// import serializeForm from 'form-serialize'

class AddBook extends Component {
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   const values = serializeForm(e.target, { hash: true })
  //   if (this.props.onCreateContact)
  //     this.props.onCreateContact(values)
  // }

  state = {
    query: '',
    searchResults: []
  }

  // componentDidMount() {
  //   BooksAPI.getAll().then((data) => {
  //     console.log(data)
  //     this.setState({
  //       currentlyReading: data.filter((book) => book.shelf === 'currentlyReading') ,
  //       read: data.filter((book) => book.shelf === 'read'),
  //       wantToRead: data.filter((book) => book.shelf === 'wantToRead'),
  //       none: data.filter((book) => book.shelf === 'none')
  //     })
  //
  //   })
  // }

  updateQuery = (query) => {
    debugger
    this.setState({ query: query.trim() })

    if (query !== '') {
      BooksAPI.search(query, 20)
        .then(response => {
          // Set all the books from the search to have default shelf of 'none'
          let resetResponse = response.map(b => {
            b.shelf = 'none'
            return b
          })
          debugger
          // Finally set the state on the search results
          this.setState({
            searchResults: resetResponse
          })
        })
        // .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  }

  clearQuery = () => {
    this.setState({
      query: '' ,
      searchResults: []})
  }

  render() {

    return (
      // <Link className='close-create-contact' to='/'>Close</Link>
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.onClearSearch}>Close</a>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery( e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.searchResults.length !== 0 && (
            <BookShelf books={this.state.searchResults} header="Search" onShelfSelect={ this.props.onBookSelect}/>
          )}
        </div>
      </div>
    )
  }
}

export default AddBook
