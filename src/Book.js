import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Book extends Component {
  render() {
    //console.log(this.props.book)
    const url = (this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : false
    const authors = (this.props.book.authors) ? this.props.book.authors : false
    const shelf = (this.props.book.shelf) ? this.props.book.shelf : false
    // This class is used in two objects ListShelf and ListBooks.
    // One has displayed books on the shelf, the search results are expensive.
    // If the book does not have a shelf props, it was sophisticated
    // and it can be put in a Want To Read shelf (function addBook)
    return (
      <div className="book">
        <div className="book-top">
          {url ?
            (<div className="book-cover"
              style={{ backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
            ) : (<div className="book-cover"></div>)
          }
          {shelf ?
            (<div className="book-shelf-changer">
              <select
                onChange={(e) => (this.props.moveBook(this.props.book, e.target.value))}
                defaultValue="move"
              >
                <option value="move" disabled >Move to...</option>
                {this.props.book.shelf !== 'currentlyReading' && (
                  <option value="currentlyReading">Currently Reading</option>
                )}
                {this.props.book.shelf !== 'wantToRead' && (
                  <option value="wantToRead">Want to Read</option>
                )}
                {this.props.book.shelf !== 'read' && (
                  <option value="read">Read</option>
                )}
                <option value="bin">Bin</option>
              </select>
            </div>
            ) : (
              <div className="book-add">
                <Link
                  to="/"
                  onClick={() => this.props.addBook(this.props.book)}
                >Adding</Link>
              </div>
            )}
        </div>
        <div className="book-title">
          {this.props.book.title}
        </div>
        { authors ?
          (<ul className="book-authors">
            {this.props.book.authors.map((author) => (
              <li key={author}>
                {author}
              </li>
            ))}</ul>
          ) : (<div className="book-authors">No author</div>)
        }
      </div>
    )
  }
}

export default Book