import React, { Component } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import DSButton from "../components/DSButton";
import * as SecureStore from "expo-secure-store";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    };
  }

  async addCategory() {
    let categories = JSON.parse(await SecureStore.getItemAsync("categories"));

    if (!categories) {
      categories = [];
    }

    categories.push(this.state.category);
    await SecureStore.setItemAsync("categories", JSON.stringify(categories));

    alert("Dodano kategorię pomyślnie");
  }

  render() {
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Nazwa kategorii"
          value={this.state.category}
          onChangeText={(e) =>
            this.setState({
              category: e,
            })
          }
        ></TextInput>
        <DSButton
          onPress={() => {
            this.addCategory();
          }}
          style={{ height: 50 }}
          buttonText="Dodaj kategorię"
        ></DSButton>
      </SafeAreaView>
    );
  }
}
