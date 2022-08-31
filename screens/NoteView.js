import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DSButton from "../components/DSButton";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default class NoteView extends Component {
  constructor(props) {
    super(props);

    //console.log("Instiating NoteView for note with key", this.props.route.params.key);

    if (this.props.route) {
      this.isEdition = true;
      this.key = this.props.route.params.key;
    } else {
      console.log("no editing");
      this.isEdition = false;
    }
    this.navigation = this.props.navigation;

    this.state = {
      name: "",
      note: "",
      categories: [],
      category: "",
    };
  }

  async loadCategories() {
    const raw = await SecureStore.getItemAsync("categories");
    let categories = [];
    if (raw) {
      categories = JSON.parse(raw);
    }
    categories.unshift("Brak kategorii");

    this.setState({ categories });
  }

  async loadNoteToState() {
    console.log("loading note with key", this.key);
    const note = JSON.parse(await SecureStore.getItemAsync(this.key));
    console.log("loaded note", note);
    this.setState({
      name: note.name,
      note: note.note,
      category: note.category,
    });
  }

  componentDidMount() {
    this.navigation.addListener("focus", () => {
      this.loadCategories();
    });
    this.loadCategories();
    if (this.isEdition) {
      this.loadNoteToState();
    }
  }

  async saveNote() {
    if (this.state.note === "" || this.state.name === "") {
      alert("Nie wprowadzono wszystkich pól!");
      return;
    }

    if (this.isEdition) {
      const note = JSON.parse(await SecureStore.getItemAsync(this.key));
      note.category = this.state.category;
      note.note = this.state.note;
      note.name = this.state.name;

      await SecureStore.setItemAsync(this.key, JSON.stringify(note));

      this.navigation.navigate("Lista notatek");
    } else {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const note = {
        backgroundColor: randomColor,
        note: this.state.note,
        name: this.state.name,
        category: this.state.category,
        date: Date.now(),
      };
      const str = await SecureStore.getItemAsync("allItems");
      const keys = JSON.parse(str);
      const uuid = this.CreateGuid();
      keys.push(uuid);

      await SecureStore.setItemAsync("allItems", JSON.stringify(keys));
      await SecureStore.setItemAsync(uuid, JSON.stringify(note));
    }

    alert("Pomyślnie zapisano.");
  }

  render() {
    const name = this.state.name;
    const note = this.state.note;
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            this.setState({ name: e });
          }}
          value={name}
          placeholder="Nazwa notatki"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            this.setState({ note: e });
          }}
          value={note}
          placeholder="notatka"
        />

        <Picker style={{ marginHorizontal: "20%" }} onValueChange={(val, index) => this.setState({ category: val })} selectedValue={this.state.category}>
          {this.state.categories.map((el) => {
            return <Picker.Item label={el} value={el} key={el}></Picker.Item>;
          })}
        </Picker>

        <View>
          <DSButton
            onPress={() => {
              this.saveNote();
            }}
            style={{ height: 50 }}
            buttonText="Zapisz notatkę"
          ></DSButton>
        </View>
      </SafeAreaView>
    );
  }
  CreateGuid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }
}
