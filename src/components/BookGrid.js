import React from 'react'
import Book from './Book'

const BookGrid = ({ books, shelves, onUpdate }) => {

	return (
		<ol className="books-grid">
			{books.map((b, i) => {
				return (
					<li key={i}>
						<Book book={b} shelves={shelves} onUpdate={onUpdate} />
					</li>
				)
			})}
		</ol>
	)
}

export default BookGrid
