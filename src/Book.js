import React from 'react'

class Book extends React.Component {

  render() {
    const { data } = this.props;
    let imgURL = data.imageLinks.thumbnail ? data.imageLinks.thumbnail : 'http://dvepublishing.com/images/cover_not_available.jpg'
    let authors = data.authors ? data.authors.join(', ') : "Author Unknown"

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ("url(" + imgURL + ")") }}></div>
          <div className="book-shelf-changer">
            <select value={data.shelf} onChange={ (e) => this.props.onShelfSelect(data, e.target.value)} >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book
