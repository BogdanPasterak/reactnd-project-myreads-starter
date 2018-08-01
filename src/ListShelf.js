import React, { Component } from 'react'

class ListShelf extends Component {
  render() {
    //console.log(this.props)
    return (
      <div className="list-books-content">
        <ul className="bookshelf">
          {this.props.myReads.map((shelf, index) => (
            <li key={index}>
              <h2 className="bookshelf-title">
                {shelf.bookshelf_title}
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelf.books.map((book) => (
                    <li key={book.title}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            backgroundImage: `url(${book.cover})`
                            }}>
                          </div>

                        </div>
                        <div className="book-title">
                          {book.title}
                        </div>
                        <div className="book-authors">
                          {book.author}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      </div>


      /*
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
      */
    )
  }
}

export default ListShelf
