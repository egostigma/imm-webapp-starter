import React, { useState, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { ExecutionResult } from "graphql";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: ID!
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $publisher: String!
    $published_year: Int!
  ) {
    updateBook(
      id: $id
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      publisher: $publisher
      published_year: $published_year
    ) {
      updated_date
    }
  }
`;

interface IBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  published_year: number;
}

type EditProps = {
  book: IBook;
};

const Update: React.FC<EditProps> = props => {
  const history = useHistory();
  const { book } = props;
  const [bookState, setBookState] = useState<IBook>({
    id: book.id,
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    description: book.description,
    publisher: book.publisher,
    published_year: book.published_year
  });
  const {
    id,
    isbn,
    title,
    author,
    description,
    publisher,
    published_year
  } = bookState;

  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    variables: {
      id: book.id,
      isbn,
      title,
      author,
      description,
      publisher,
      published_year
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setBookState({ ...bookState, [name]: value });
  };

  const handleTextAreaChange = ({
    target
  }: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;
    setBookState({ ...bookState, [name]: value });
  };

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">EDIT BOOK</h3>
        </div>
        <div className="panel-body">
          <h4>
            <Link to="/" className="btn btn-primary">
              Book List
            </Link>
          </h4>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateBook({
                variables: {
                  id,
                  isbn,
                  title,
                  author,
                  description,
                  publisher,
                  published_year: parseInt(published_year.toString())
                }
              }).then(({ errors, data }: ExecutionResult) => {
                if (data) {
                  history.push("/");
                }
              });
            }}
          >
            <div className="form-group">
              <label htmlFor="isbn">ISBN:</label>
              <input
                type="text"
                className="form-control"
                name="isbn"
                placeholder="ISBN"
                value={isbn}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                className="form-control"
                name="author"
                placeholder="Author"
                value={author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                cols={80}
                rows={3}
                className="form-control"
                name="description"
                placeholder="Description"
                value={description}
                onChange={handleTextAreaChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Publisher:</label>
              <input
                type="text"
                className="form-control"
                name="publisher"
                placeholder="Publisher"
                value={publisher}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Published Year:</label>
              <input
                type="number"
                className="form-control"
                name="published_year"
                placeholder="Published Year"
                value={published_year}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
