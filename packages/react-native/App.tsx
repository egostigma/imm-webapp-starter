import React from "react";
import { createAppContainer, NavigationRouteConfigMap } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import BooksScreen from "./components/BooksScreen";
import BookDetailScreen from "./components/BookDetailScreen";
import AddBookScreen from "./components/AddBookScreen";
import EditBookScreen from "./components/EditBookScreen";
import { ApolloClient } from "apollo-client";
import { ApolloCache } from "apollo-cache";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

interface BookOptions {
  routeName: string
}

interface BookPropType {
}

type RootStackParamList = {
  Book: NavigationRouteConfigMap<BookOptions, BookPropType>;
  BookDetails: NavigationRouteConfigMap<BookOptions, BookPropType>;
  AddBook: NavigationRouteConfigMap<BookOptions, BookPropType>;
  EditBook: NavigationRouteConfigMap<BookOptions, BookPropType>;
};

const MainNavigator = createStackNavigator({
  Book: { screen: BooksScreen },
  BookDetails: { screen: BookDetailScreen },
  AddBook: { screen: AddBookScreen },
  EditBook: { screen: EditBookScreen }
});

const cache: ApolloCache<NormalizedCacheObject> = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: "http://localhost:4000"
    })
  ])
});

const MyRootComponent = createAppContainer(MainNavigator);

const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

export default App;
