import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
  render() {
    //console.log(this.props.addBook)
    if(this.props.listBooks && this.props.listBooks.length > 0)
      return (
        <ol className="books-grid">
          {this.props.listBooks.map((book) => (
            <li key={book.id}>
              <Book book={book} addBook={this.props.addBook} />
            </li>
          ))}
        </ol>
      )
    else
      return (<div><h1>Nothing found</h1></div>)
  }
}

export default ListBooks