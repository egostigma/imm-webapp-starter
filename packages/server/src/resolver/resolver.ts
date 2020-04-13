import { IResolvers } from "graphql-tools";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import BookModel from "../models/Book";

const resolvers: IResolvers = {
  Query: {
    books() {
      const books = BookModel.find().exec();
      if (!books) {
        throw new Error("Error");
      }
      return books;
    },
    book(_, args) {
      const book = BookModel.findById(args.id).exec();
      if (!book) {
        throw new Error("Error");
      }
      return book;
    }
  },
  Mutation: {
    addBook(_, args) {
      const bookModel = new BookModel(args);
      const newBook = bookModel.save();
      if (!newBook) {
        throw new Error("Error");
      }
      return newBook;
    },
    updateBook(_, args) {
      return BookModel.findByIdAndUpdate(
        args.id,
        {
          isbn: args.isbn,
          title: args.title,
          author: args.author,
          description: args.description,
          // eslint-disable-next-line @typescript-eslint/camelcase
          published_year: args.published_year,
          publisher: args.publisher,
          // eslint-disable-next-line @typescript-eslint/camelcase
          updated_date: new Date()
        },
        err => {
          if (err) return err;
        }
      );
    },
    removeBook(_, args) {
      const rmBook = BookModel.findByIdAndRemove(args.id).exec();
      if (!rmBook) {
        throw new Error("Error");
      }
      return rmBook;
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      console.log("parseValue", value);
      return new Date(value);
    },
    serialize(value) {
      // return value.getTime();
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};

export default resolvers;
