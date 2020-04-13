import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ExecutionResult } from "graphql";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      _id
    }
  }
`;

type DeleteProps = {
  book: { _id: string };
};

const Delete: React.FC<DeleteProps> = props => {
  const { book } = props;
  const history = useHistory();
  const [removeBook, { loading, error }] = useMutation(DELETE_BOOK, {
    variables: { id: book._id }
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          removeBook({ variables: { id: book._id } }).then(
            ({ errors, data }: ExecutionResult) => {
              if (data) {
                history.push("/");
              }
            }
          );
        }}
      >
        <Link to={`/edit/${book._id}`} className="btn btn-success">
          Edit
        </Link>
        &nbsp;
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </div>
  );
};

export default Delete;
