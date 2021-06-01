import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'
import * as BooksAPI from './services/BooksAPI'
import { BrowserRouter } from 'react-router-dom'

/**
 * The starting point of this App.
 */
const BooksApp = () => {
	const [shelves, setShelves] = useState({})

	useEffect(() => {
		BooksAPI.update('-1', 'none').then((_shelves) => {
			setShelves(_shelves)
		})
	}, [])

	const onUpdate = (_book, _shelf) => {
		BooksAPI.update({ id: _book }, _shelf).then((_shelves) => {
			setShelves(_shelves)
		})
	}

	return (
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Home shelves={shelves} onUpdate={onUpdate} />
					</Route>
					<Route path="/search">
						<Search shelves={shelves} onUpdate={onUpdate} />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default BooksApp
