import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'

/** 
 This course is not designed to teach Test Driven Development. 
 Feel free to use this file to test your application, but it 
 is not required.
**/

describe('App', () => {
	test('renders App component', () => {
		render(<App />)

		screen.debug()
	})
})
