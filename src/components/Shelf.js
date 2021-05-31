import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import BookGrid from './BookGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

/**
 * Displays a grid of Book components.
 *
 */
const Shelf = ({ shelf, books, shelves, onUpdate }) => {
	const hash = `#${_.kebabCase(shelf)}`

	const [active, setActive] = useState(false)

	let { url } = useRouteMatch()

	let location = useLocation()

	useEffect(() => {
		if (location.hash === hash) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [location, active])

	return (
		<div className="bookshelf">
			<Link
				style={{ textDecoration: 'none' }}
				to={{
					pathname: url,
					hash: active ? '' : hash,
				}}
			>
				<h2 className="bookshelf-title">
					{_.startCase(shelf) + ' '}
					<FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} />
				</h2>
			</Link>
			<div className={`${'bookshelf-books ' + (active ? '' : 'hidden')}`}>
				<BookGrid books={books} shelves={shelves} onUpdate={onUpdate} />
			</div>
		</div>
	)
}

Shelf.propTypes = {
	shelf: PropTypes.string.isRequired,
	shelves: PropTypes.object.isRequired,
	books: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	onUpdate: function (props, propName, componentName) {
		var fn = props[propName]
		if (
			!fn.prototype ||
			(typeof fn.prototype.constructor !== 'function' &&
				fn.prototype.constructor.length !== 2)
		) {
			return new Error(
				`${componentName}.${propName} must be a function with 2 argument.`
			)
		}
	},
}

export default Shelf
