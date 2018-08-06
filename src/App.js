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
    BooksAPI.getAll()
      .then((books) => {this.setState({ books })})
      .catch((error) => {console.log(error)})
  }

  checkBooks = (toCheckBooks) => {
    return toCheckBooks.map((book) => (
      this.state.books.find(myBook => myBook.id === book.id) || book))
  }
  updateFound = (newBook) => {
    console.log("update")
    if (this.state.found.length){
          console.log("w sukanych sa")
          this.setState({found : this.state.found.map(book => (
            (book.id !== newBook.id) ? book : newBook
          ))})
    }
    return
  }

  foundBooks = (frase) => {
    if (frase)
      BooksAPI.search(frase)
        .then((matched) => {
          return this.checkBooks(matched)
        })
        .then((checked) => {
          //console.log(checked)
          this.setState({ found : checked })
        })
        .catch((error) => {
          // empty query test frase :'line'
          console.log(error)
          this.setState({found : []})
        })
    else
      this.setState({found : []})
  }

  moveBook = (book, shelf) => {
    console.log(book.shelf)
    // console.log(this.state.found)
    BooksAPI.update(book, shelf)
      .then(
        BooksAPI.get(book.id).then(bu => console.log(bu.shelf)),
        BooksAPI.get(book.id).then(bu => (this.updateFound(bu))),
        // BooksAPI.get(book.id).then(bu => (
        //   this.setState({ found : this.state.found.find(b => b.id !== bu.id) || bu})
        // )),
        BooksAPI.getAll()
          .then((books) => {this.setState({ books })})
          .then(console.log(this.state.books)),

        console.log("po"),
        (() => (this.state.found.length > 0 && (
                  console.log("nie pusta")
        ))),
        console.log(this.state.found.length),
    )
    //this.setState({ found : this.checkBooks(this.state.found)})

      //.then( BooksAPI.get(book.id).then( b => console.log(b.shelf)))

      //.then( BooksAPI.getAll().then((books) => {
      //  this.setState({ found : this.checkBooks(this.state.found, books)})
      //this.setState({ books })

    //}))
      // Update searched books
      //.then(this.setState({ found : this.checkBooks(this.state.found)}))
  }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search"
                onClick={() => this.setState({found : []})}
              >Close</Link>
              <div className="search-books-input-wrapper">
                {

                }
                <input onChange={(event) => this.foundBooks(event.target.value)}
                      type="text"
                      placeholder="Search by title or author"
                />

              </div>
            </div>
            <div className="search-books-results">
              <ListBooks
                listBooks={this.state.found}
                moveBook={this.moveBook}
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
              <Link
                to="/search"
                onClick={() => this.setState({found : []})}
              >Add a book</Link>
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
