import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    this.state = {
      items: [],
      sortings: "ASC",
      fontSize: "12",
      filter: "",
    };
  }

  async loadData() {
    items = [];
    const str = await SecureStore.getItemAsync("allItems");
    const keys = JSON.parse(str);
    if (!keys) {
      await SecureStore.setItemAsync("allItems", JSON.stringify([]));
    } else {
      for (let element of keys) {
        const str = await SecureStore.getItemAsync(element);
        const fetched = JSON.parse(str);
        if (fetched) {
          fetched["key"] = element;
          items.push(fetched);
        }
      }
    }

    this.setState({
      items,
    });
  }

  async loadSettings() {
    const values = {
      fontSize: await SecureStore.getItemAsync("fontSize"),
      sortings: await SecureStore.getItemAsync("sortings"),
    };

    if (!values.fontSize) {
      await SecureStore.setItemAsync("fontSize", "12");
      values.fontSize = "12";
    }

    if (!values.sortings) {
      await SecureStore.setItemAsync("sortings", "ASC");
      values.sortings = "ASC";
    }

    this.setState(values);
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.loadData();
      this.loadSettings();
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus");
  }
  render() {
    let items = this.state.items;
    if (this.state.filter.length !== 0) {
      items = items.filter((el) => {
        const name = el.name;
        console.log(name, this.state.filter, "check if includes...");
        return name.includes(this.state.filter);
      });
    }

    items = items.sort((a, b) => {
      if (this.state.sortings == "ASC") {
        return a.date - b.date;
      } else {
        return b.date - a.date;
      }
    });

    return (
      <View>
        <TextInput
          onChangeText={(e) => {
            this.setState({ filter: e });
          }}
          style={styles.input}
          placeholder="Nazwa notatki"
        />

        <FlatList
          style={{ height: "100%" }}
          data={items}
          numColumns={2}
          renderItem={({ item }) => (
            <ListItem
              navigation={this.navigation}
              item={item}
              fontSize={parseInt(this.state.fontSize)}
              reloadList={() => {
                this.loadData();
              }}
            ></ListItem>
          )}
        />
      </View>
    );
  }
}
