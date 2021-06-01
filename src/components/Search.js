import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../services/BooksAPI'
import * as _ from 'lodash'
import BookGrid from './BookGrid'
import { sanitiseBooks } from '../helpers/BookHelper'

const keyWords = [
	'Android',
	'Art',
	'Artificial Intelligence',
	'Astronomy',
	'Austen',
	'Baseball',
	'Basketball',
	'Bhagat',
	'Biography',
	'Brief',
	'Business',
	'Camus',
	'Cervantes',
	'Christie',
	'Classics',
	'Comics',
	'Cook',
	'Cricket',
	'Cycling',
	'Desai',
	'Design',
	'Development',
	'Digital Marketing',
	'Drama',
	'Drawing',
	'Dumas',
	'Education',
	'Everything',
	'Fantasy',
	'Film',
	'Finance',
	'First',
	'Fitness',
	'Football',
	'Future',
	'Games',
	'Gandhi',
	'Homer',
	'Horror',
	'Hugo',
	'Ibsen',
	'Journey',
	'Kafka',
	'King',
	'Lahiri',
	'Larsson',
	'Learn',
	'Literary Fiction',
	'Make',
	'Manage',
	'Marquez',
	'Money',
	'Mystery',
	'Negotiate',
	'Painting',
	'Philosophy',
	'Photography',
	'Poetry',
	'Production',
	'Programming',
	'React',
	'Redux',
	'River',
	'Robotics',
	'Rowling',
	'Satire',
	'Science Fiction',
	'Shakespeare',
	'Singh',
	'Swimming',
	'Tale',
	'Thrun',
	'Time',
	'Tolstoy',
	'Travel',
	'Ultimate',
	'Virtual Reality',
	'Web Development',
	'iOS',
]

const Search = ({ shelves, onUpdate }) => {
	const [query, setQuery] = useState('')
	const [books, setBooks] = useState([])
	const [searching, setSearching] = useState(false)

	const handleSearch = (query) => {
		setSearching(true)
		setQuery(query)
	}

	const searchBooks = (query) => {
		BooksAPI.search(query).then((books) => {
			if (!books || books.error) {
				setBooks([])
			} else {
				sanitiseBooks(books)
				setBooks(books)
			}
			setSearching(false)
		})
	}

	const debounceSearchBooks = _.debounce(searchBooks, 250)

	useEffect(() => {
		debounceSearchBooks(query)
	}, [query])

	const onUpdateShelf = (bookId, shelf) => {
		books.filter((b) => b.id === bookId).map((b) => (b.shelf = shelf))
		setBooks([...books])
		onUpdate(bookId, shelf)
	}

	const renderBooks = () => {
		return (
			<div className="search-books-results">
				<BookGrid books={books} shelves={shelves} onUpdate={onUpdateShelf} />
			</div>
		)
	}

	const renderNoBooks = () => {
		return query.length === 0 ? renderNoQuery() : renderNoMatch()
	}

	const renderNoQuery = () => {
		return (
			<div className="search-books-message">
				<p>Type above to search.</p>
			</div>
		)
	}

	const renderNoMatch = () => {
		return (
			<div className="search-books-message">
				<p>No books match your search!</p>
				<p>Suggestions:</p>
				<ul>
					{keyWords.map((word) => {
						return <li key={word}>{word}</li>
					})}
				</ul>
			</div>
		)
	}

	const renderSearching = () => {
		return (
			<div className="search-books-message">
				<p>Searching...</p>
			</div>
		)
	}

	const renderResults = () => {
		if (searching) {
			return renderSearching()
		} else if (books && books.length > 0) {
			return renderBooks()
		} else {
			return renderNoBooks()
		}
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
						onChange={(event) => handleSearch(event.currentTarget.value)}
					/>
				</div>
			</div>
			{renderResults()}
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
