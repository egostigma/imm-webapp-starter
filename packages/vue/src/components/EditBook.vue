<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Book
        <router-link :to="{ name: 'ShowBook', params: { id: bookId } }">(Show Book)</router-link>
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter ISBN"
          >
            <b-form-input id="isbn" v-model.trim="book.isbn"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Title"
          >
            <b-form-input id="title" v-model.trim="book.title"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Author"
          >
            <b-form-input id="author" v-model.trim="book.author"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Description"
          >
            <b-form-textarea
              id="description"
              v-model="book.description"
              placeholder="Enter something"
              :rows="2"
              :max-rows="6"
            >{{book.description}}</b-form-textarea>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Publisher"
          >
            <b-form-input id="publisher" v-model.trim="book.publisher"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Published Year"
          >
            <b-form-input type="number" id="published_year" v-model.trim="book.published_year"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
import router from "../router";

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
    }
  }
`;

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

export default {
  name: "EditBook",
  data() {
    return {
      bookId: this.$route.params.id,
      book: {}
    };
  },
  apollo: {
    book: {
      query: GET_BOOK,
      variables() {
        return {
          bookId: this.bookId
        };
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.$apollo
        .mutate({
          mutation: UPDATE_BOOK,
          variables: {
            id: this.book._id,
            isbn: this.book.isbn,
            title: this.book.title,
            author: this.book.author,
            description: this.book.description,
            publisher: this.book.publisher,
            published_year: parseInt(this.book.published_year)
          }
        })
        .then(data => {
          console.log(data);
          router.push({
            name: "ShowBook",
            params: { id: this.$route.params.id }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
</style>
