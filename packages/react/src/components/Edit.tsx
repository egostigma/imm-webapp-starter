import React from "react";
import gql from "graphql-tag";
import { useQuery} from "@apollo/react-hooks";
import Update from './Update'

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

type EditProps = {
  match: { params: { id: string } };
};

const Edit: React.FC<EditProps> = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { bookId: id },
    pollInterval: 500
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const { book } = data;
  book.id = id;

  return (
    <Update book={book}/>
  );
};

export default Edit;
