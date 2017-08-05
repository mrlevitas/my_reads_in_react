import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

  render() {
    const { books = [] } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.header}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id} >
                <Book key={book.id} data={book} onShelfSelect={this.props.onShelfSelect}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
