import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import ListShelf from './ListShelf'
import ListBooks from './ListBooks'
import NoMatch from './NoMatch'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      found: [],
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  foundBooks = (frase) => {
    //console.log('Frase : ' + frase)
    if (frase)
      BooksAPI.search(frase).then((found) => {
        this.setState({ found })
      })
    else if (frase === '')
      this.setState({found : []})
  }
  addBook = (book) => {
    //console.log(book)
    BooksAPI.update(book, 'wantToRead')
      .then(BooksAPI.getAll().then((books) => {
        this.setState({ books })
    }))
  }
  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
    BooksAPI.update(book, 'bin')
  }
  moveBook = (book, shelf) => {
    // console.log(book)
    // console.log(shelf)
    BooksAPI.update(book, shelf)
    .then(
      BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    )
  }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {

                }
                <input onChange={(event) => this.foundBooks(event.target.value)} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
                  <ListBooks
                    listBooks={this.state.found}
                    addBook={this.addBook}
                  />
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListShelf
              books={this.state.books}
              moveBook={this.moveBook}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
