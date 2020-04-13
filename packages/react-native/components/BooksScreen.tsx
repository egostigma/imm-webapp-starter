import React, { Component, FC } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  ListRenderItem
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  StackActions
} from "react-navigation";
import { useNavigation } from "react-navigation-hooks";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

interface IBook {
  _id: string;
  isbn: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  published_year: number;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

const BooksScreen = ({navigation} : NavigationParams) => {
  const { data, loading, error } = useQuery(GET_BOOKS, {
    pollInterval: 500
  });

  if (loading)
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (error)
    return (
      <View style={styles.activity}>
        <Text>`Error! ${error.message}`</Text>
      </View>
    );

  // const navigation = useNavigation<NavigationParams>();

  const keyExtractor = ({}, index: number) => index.toString();

  const renderItem: ListRenderItem<IBook> = ({ item }) => (
    <ListItem
      title={item.title}
      onPress={() => {
        navigation.navigate("BookDetails", {
          id: `${item._id}`
        });
      }}
      chevron
      bottomDivider
    />
  );
  
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data.books}
      renderItem={renderItem}
    />
  );
};

BooksScreen.navigationOptions = ({
  navigation
}: {
  navigation: Navigation;
}) => ({
  title: "LIST OF BOOKS",
  headerRight: (
    <Button
      buttonStyle={{ padding: 0, backgroundColor: "transparent" }}
      icon={{ name: "add-circle", style: { marginRight: 0, fontSize: 28 } }}
      onPress={() => {
        const pushAction = StackActions.push({
          routeName: "AddBook"
        });

        navigation.dispatch(pushAction);
      }}
    />
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default BooksScreen;
