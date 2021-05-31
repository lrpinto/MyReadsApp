import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../services/BooksAPI'
import * as _ from 'lodash'
import BookGrid from './BookGrid'
import { sanitiseBooks } from '../helpers/BookHelper'

const Search = ({ shelves, onUpdate }) => {
	const [query, setQuery] = useState('')
	const [books, setBooks] = useState([])

	const searchBooks = (query) => {
		BooksAPI.search(query).then((books) => {
			if (books.error) {
				setBooks([])
			} else {
				sanitiseBooks(books)
				setBooks(books)				
			}

		})
	}

	const debounceSearchBooks = _.debounce(searchBooks, 250)

	useEffect(() => {
		if (query) {
			debounceSearchBooks(query)
		}
	}, [query])

	const onUpdateShelf = (bookId, shelf) => {
		books.filter(b => b.id === bookId).map(b => b.shelf = shelf)
		setBooks([ ...books])
		onUpdate(bookId, shelf)
	}

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/">
					<button className="close-search"></button>
				</Link>

				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						value={query}
						onChange={(event) => setQuery(event.currentTarget.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<BookGrid books={books} shelves={shelves} onUpdate={onUpdateShelf} />
			</div>
		</div>
	)
}

export default Search

/*
NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

However, remember that the BooksAPI.search method DOES search by title or author. 
So, don't worry if you don't find a specific author or title. 
Every search is limited by search terms.
*/
