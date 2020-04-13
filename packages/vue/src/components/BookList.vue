<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Book List
        <b-link to="/add-book">(Add Book)</b-link>
      </h2>
      <b-table striped hover :items="books" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
import router from "../router";
const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;
export default {
  name: "BookList",
  apollo: {
    books: {
      query: GET_BOOKS,
      pollInterval: 300
    }
  },
  data() {
    return {
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
          class: "text-left"
        },
        {
          key: "author",
          label: "Author",
          sortable: true,
          class: "text-left"
        },
        {
          key: "actions",
          label: "Action"
        }
      ],
      books: []
    };
  },
  methods: {
    details(book) {
      router.push({ name: "ShowBook", params: { id: book._id } });
    }
  }
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>
