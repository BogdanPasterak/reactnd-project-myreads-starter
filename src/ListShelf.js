import React from 'react'
import Book from './Book'

function ListShelf (props) {

    //console.log(props.books)
    return (
       <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter(book => (book.shelf === 'currentlyReading')).map(book => (
                  <li key={book.id}>
                    <Book book={book} moveBook={props.moveBook} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter(book => (book.shelf === 'wantToRead')).map(book => (
                  <li key={book.id}>
                    <Book book={book} moveBook={props.moveBook} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter(book => (book.shelf === 'read')).map(book => (
                  <li key={book.id}>
                    <Book book={book} moveBook={props.moveBook} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>


    )

}

export default ListShelf
