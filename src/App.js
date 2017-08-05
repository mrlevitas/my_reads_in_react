import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import AddBook from './AddBook'
import { Route , Link} from 'react-router-dom'

class App extends React.Component {

  constructor () {
     super()
     this.state = {
       currentlyReading : [],
       read: [],
       wantToRead: []
     }
   }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        currentlyReading: data.filter((book) => book.shelf === 'currentlyReading') ,
        read: data.filter((book) => book.shelf === 'read'),
        wantToRead: data.filter((book) => book.shelf === 'wantToRead'),
      })

    })
  }

  updateShelf = (book, shelf) => {
    let currShelf = book.shelf
    book.shelf = shelf

    this.setState((state) => ({
      [currShelf]: state[currShelf].filter((b) => b.id !== book.id),
      [shelf]: state[shelf].concat( [book])
      })
    )

    BooksAPI.update(book, shelf)
  }

  addBookToShelf = (book, shelf) => {

    book.shelf = shelf
    this.setState((state) => ({
      [shelf]: state[shelf].concat( [book])
      })
    )

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.state.currentlyReading} header="Currently Reading" onShelfSelect={this.updateShelf}/>
              </div>
              <div>
                <BookShelf books={this.state.wantToRead} header="Want to Read" onShelfSelect={this.updateShelf} />
              </div>
              <div>
                <BookShelf books={this.state.read} header="Read" onShelfSelect={this.updateShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={({ history }) => (
          <AddBook
            onBookSelect={(book, shelf) => {
              this.addBookToShelf(book, shelf)
              // history.push('/')
            }}
            currState={this.state}
          />
        )}/>

      </div>
    )
  }
}

export default App
