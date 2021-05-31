
const makeValidBook = (b) => {
    if (!b.title) {
        b.title = ''
    }
    if (!b.authors) {
        b.authors = ''
    }
    if (!b.imageLinks || !b.imageLinks.thumbnail) {
        b.imageLinks = { thumbnail: '' }
    }
}

const sanitiseBooks = (books) => { 
    if (!books) {
        return []
    }

    return { ...books.map(book => makeValidBook(book)) }
}

const setBookShelf = (book, shelves) => {
    book.shelf = 'none'
    Object.entries(shelves).forEach(([shelf, books]) => {
        if (books.indexOf(book.id) >= 0) {
            book.shelf = shelf
        }
    })
}

export { makeValidBook, sanitiseBooks, setBookShelf}