import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import "./App.css";
import { useQuery } from '@apollo/react-hooks';

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_BOOKS, {
    pollInterval: 500
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Book List</h3>
          <h4>
            <Link to="/create">Add Book</Link>
          </h4>
        </div>
        <div className="panel-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {data.books.map((book: any, index: number) => (
                <tr key={index}>
                  <td>
                    <Link to={`/show/${book._id}`}>{book.title}</Link>
                  </td>
                  <td>{book.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
