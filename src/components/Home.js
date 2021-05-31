import React from 'react'
import HomeHeader from './HomeHeader'
import Shelf from './Shelf'
import OpenSearch from './OpenSearch'

const Home = ({ shelves, onUpdate }) => {
	
	return (
		<div className="list-books">
			<HomeHeader title={`My Reads`} />
			<div className="list-books-content">
				<div>
					{Object.entries(shelves).map(([shelf, books]) => (
						<Shelf
							key={shelf}
							shelf={shelf}
							books={books}
							shelves={shelves}
							onUpdate={onUpdate}
						/>
					))}
				</div>
			</div>
			<OpenSearch />
		</div>
	)
}

export default Home
