import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'

const OPEN = 'OPEN'
const CLOSED = 'CLOSED'
/**
 * Displays a list of 'shelves' where a given 'shelf' is marked with a tick.
 * On the user selecting one of the shelf labels, it calls onUpdate with the shelf ID corresponding to the selected shelf label.
 */
const ShelfSelector = ({ shelf, shelves, onUpdate }) => {
	const shelvesKeys = Object.keys(shelves)

	const [selectorState, setSelectorState] = useState(CLOSED)

	const closeSelector = () => {
		setSelectorState(CLOSED)
	}

	const openSelector = () => {
		setSelectorState(OPEN)
	}

	const toggleSelector = () => {
		return selectorState === OPEN ? closeSelector() : openSelector()
	}

	return (
		<div className="book-shelf-changer" onClick={toggleSelector}>
			{/* select replaced by ul to allow marking the selected item with a checkbox */}
			<ul
				className={selectorState === CLOSED ? 'hidden' : 'dropdown'}
				onClick={(event) => {
					const newShelf = event.target.getAttribute('value')
					onUpdate(newShelf)
				}}
				onMouseLeave={closeSelector}
			>
				<li className="book-shelf-menu-title" key={'move'} value={'move'}>
					{'Move to...'}
				</li>
				{shelvesKeys.map((_shelf) => (
					<li
						className={shelf === _shelf ? 'checked' : ''}
						key={_shelf}
						value={_shelf}
					>
						{_.startCase(_shelf)}
					</li>
				))}
				<li
					key={'none'}
					value={'none'}
					className={shelf === 'none' ? 'checked' : ''}
				>
					{'None'}
				</li>
			</ul>
		</div>
	)
}

ShelfSelector.propTypes = {
	shelf: PropTypes.string,
	shelves: PropTypes.object.isRequired,
	onUpdate: function (props, propName, componentName) {
		var fn = props[propName]
		if (
			!fn.prototype ||
			(typeof fn.prototype.constructor !== 'function' &&
				fn.prototype.constructor.length !== 1)
		) {
			return new Error(
				`${componentName}.${propName} must be a function with 1 argument.`
			)
		}
	},
}
export default ShelfSelector
