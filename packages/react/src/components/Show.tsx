import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import "../App.css";
import Delete from "./Delete";

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

type ShowProps = {
  match: { params: { id: string } };
};

const Show: React.FC<ShowProps> = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { bookId : id },
    pollInterval: 500
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const { book } = data;

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <Link to="/">Book List</Link>
          </h4>
          <h3 className="panel-title">{book.title}</h3>
        </div>
        <div className="panel-body">
          <dl>
            <dt>ISBN:</dt>
            <dd>{book.isbn}</dd>
            <dt>Author:</dt>
            <dd>{book.author}</dd>
            <dt>Description:</dt>
            <dd>{book.description}</dd>
            <dt>Published Year:</dt>
            <dd>{book.published_year}</dd>
            <dt>Publisher:</dt>
            <dd>{book.publisher}</dd>
            <dt>Updated:</dt>
            <dd>{book.updated_date}</dd>
            <Delete book={book}/>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Show;
