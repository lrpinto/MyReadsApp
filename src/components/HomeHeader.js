import React from 'react'
import PropTypes from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'

const HomeHeader = ({ title }) => {
    let { url } = useRouteMatch()

    return (
        <Link to={url} style={{ textDecoration: 'none' }}>
            <div className="list-books-title">
                <h1>{title}</h1>
            </div>
        </Link>
    )
}

HomeHeader.propTypes = {
    title: PropTypes.string.isRequired,
}

export default HomeHeader
