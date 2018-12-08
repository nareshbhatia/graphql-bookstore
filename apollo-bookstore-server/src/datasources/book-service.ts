import { DataSource } from 'apollo-datasource';

export class BookService extends DataSource {
    constructor() {
        super();
    }

    initialize() {}

    getAuthors() {
        return Promise.resolve(authors);
    }

    getAuthor(id) {
        return Promise.resolve(findAuthor(id));
    }

    getAuthorBooks(authorId) {
        const filteredBooks = bookAuthors
            .filter(bookAuthor => bookAuthor.authorId === authorId)
            .map(bookAuthor => findBook(bookAuthor.bookId));
        return Promise.resolve(filteredBooks);
    }

    createAuthor(authorInput) {
        const author = Object.assign({}, authorInput, { id: newId() });
        authors.push(author);
        return Promise.resolve(author);
    }

    updateAuthor(authorId, authorInput) {
        let author = findAuthor(authorId);
        author = author ? Object.assign(author, authorInput) : null;
        return Promise.resolve(author);
    }

    getPublishers() {
        return Promise.resolve(publishers);
    }

    getPublisher(id) {
        return Promise.resolve(findPublisher(id));
    }

    getPublisherBooks(publisherId) {
        return Promise.resolve(
            books.filter(book => book.publisherId === publisherId)
        );
    }

    createPublisher(publisherInput) {
        const publisher = Object.assign({}, publisherInput, { id: newId() });
        publishers.push(publisher);
        return Promise.resolve(publisher);
    }

    updatePublisher(publisherId, publisherInput) {
        let publisher = findPublisher(publisherId);
        publisher = publisher ? Object.assign(publisher, publisherInput) : null;
        return Promise.resolve(publisher);
    }

    getBooks() {
        return Promise.resolve(books);
    }

    getBook(id) {
        return Promise.resolve(findBook(id));
    }

    getBookPublisher(bookId) {
        const book = findBook(bookId);
        const publisher = book ? findPublisher(book.publisherId) : null;
        return Promise.resolve(publisher);
    }

    getBookAuthors(bookId) {
        const filteredAuthors = bookAuthors
            .filter(bookAuthor => bookAuthor.bookId === bookId)
            .map(bookAuthor => findAuthor(bookAuthor.authorId));
        return Promise.resolve(filteredAuthors);
    }

    createBook(bookInput, publisherId) {
        const book = Object.assign({}, bookInput, { id: newId(), publisherId });
        books.push(book);
        return Promise.resolve(book);
    }

    updateBook(bookId, bookInput, publisherId) {
        let book = findBook(bookId);
        book = book ? Object.assign(book, bookInput) : null;
        if (book) {
            book = Object.assign(book, bookInput, { publisherId: publisherId });
        }
        return Promise.resolve(book);
    }

    setBookAuthors(bookId, authorIds) {
        const book = findBook(bookId);
        if (book) {
            // Remove current book authors
            bookAuthors = bookAuthors.filter(
                bookAuthor => bookAuthor.bookId !== bookId
            );

            // Add new book authors
            authorIds.forEach(authorId => {
                bookAuthors.push({
                    id: `${bookId}-${authorId}`,
                    bookId: bookId,
                    authorId: authorId
                });
            });
        }
        return Promise.resolve(book);
    }
}

// ----- Helper Functions -----
function newId() {
    return Math.random()
        .toString(36)
        .substring(7);
}

function findAuthor(id) {
    return authors.find(author => author.id === id);
}

function findPublisher(id) {
    return publishers.find(publisher => publisher.id === id);
}

function findBook(id) {
    return books.find(book => book.id === id);
}

// ----- Initial Data -----
let authors = [
    {
        id: 'erich-gamma',
        name: 'Erich Gamma'
    },
    {
        id: 'richard-helm',
        name: 'Richard Helm'
    },
    {
        id: 'ralph-johnson',
        name: 'Ralph Johnson'
    },
    {
        id: 'john-vlissides',
        name: 'John Vlissides'
    },
    {
        id: 'martin-fowler',
        name: 'Martin Fowler'
    },
    {
        id: 'eric-evans',
        name: 'Eric Evans'
    },
    {
        id: 'robert-martin',
        name: 'Robert C. Martin'
    }
];

let publishers = [
    {
        id: 'addison-wesley',
        name: 'Addison Wesley'
    },
    {
        id: 'prentice-hall',
        name: 'Prentice Hall'
    },
    {
        id: 'pearson',
        name: 'Pearson Publishing'
    }
];

let books = [
    {
        id: 'design-patterns',
        name: 'Design Patterns - Elements of Reusable Object-Oriented Software',
        publisherId: 'addison-wesley'
    },
    {
        id: 'refactoring',
        name: 'Refactoring - Improving the Design of Existing Code',
        publisherId: 'addison-wesley'
    },
    {
        id: 'patterns-of-enterprise-application-architecture',
        name: 'Patterns of Enterprise Application Architecture',
        publisherId: 'addison-wesley'
    },
    {
        id: 'domain-driven-design',
        name: 'Domain-Driven Design',
        publisherId: 'addison-wesley'
    },
    {
        id: 'clean-code',
        name: 'Clean Code - A Handbook of Agile Software Craftsmanship',
        publisherId: 'prentice-hall'
    },
    {
        id: 'agile-software-development',
        name: 'Agile Software Development, Principles, Patterns, and Practices',
        publisherId: 'pearson'
    }
];

let bookAuthors = [
    {
        id: 'design-patterns-erich-gamma',
        bookId: 'design-patterns',
        authorId: 'erich-gamma'
    },
    {
        id: 'design-patterns-richard-helm',
        bookId: 'design-patterns',
        authorId: 'richard-helm'
    },
    {
        id: 'design-patterns-ralph-johnson',
        bookId: 'design-patterns',
        authorId: 'ralph-johnson'
    },
    {
        id: 'design-patterns-john-vlissides',
        bookId: 'design-patterns',
        authorId: 'john-vlissides'
    },
    {
        id: 'refactoring-martin-fowler',
        bookId: 'refactoring',
        authorId: 'martin-fowler'
    },
    {
        id: 'patterns-of-enterprise-application-architecture-martin-fowler',
        bookId: 'patterns-of-enterprise-application-architecture',
        authorId: 'martin-fowler'
    },
    {
        id: 'domain-driven-design-eric-evans',
        bookId: 'domain-driven-design',
        authorId: 'eric-evans'
    },
    {
        id: 'clean-code-robert-martin',
        bookId: 'clean-code',
        authorId: 'robert-martin'
    },
    {
        id: 'agile-software-development-robert-martin',
        bookId: 'agile-software-development',
        authorId: 'robert-martin'
    }
];
