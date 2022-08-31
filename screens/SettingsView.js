import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DSButton from "../components/DSButton";
import * as SecureStore from "expo-secure-store";

export default class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;

    this.state = {
      fontSize: "12",
      sortings: "ASC",
    };
  }

  async loadStorageToState() {
    const values = {
      fontSize: await SecureStore.getItemAsync("fontSize"),
      sortings: await SecureStore.getItemAsync("sortings"),
    };

    console.log("loading current values, to state...");
    console.log(values, "values");
    this.setState(values);
  }

  async saveSettings() {
    await SecureStore.setItemAsync("sortings", this.state.sortings);
    await SecureStore.setItemAsync("fontSize", this.state.fontSize);
    await alert("Zapisano ustawienia pomyślnie.");

    this.navigation.navigate("Lista notek");
  }

  componentDidMount() {
    this.navigation.addListener("focus", () => {
      this.loadStorageToState();
    });
    this.loadStorageToState();
  }

  componentWillUnmount() {
    this.navigation.removeListener("focus");
  }

  static navigationOptions = {
    drawerLabel: () => {
      return null;
    },
  };
  render() {
    return (
      <SafeAreaView>
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: "center" }}>Rozmiar czcionki</Text>
          <Picker
            selectedValue={this.state.fontSize}
            style={{ marginHorizontal: "20%" }}
            onValueChange={async (val, index) => {
              this.setState({
                fontSize: val,
              });
            }}
          >
            <Picker.Item label="12" value={"12"}></Picker.Item>
            <Picker.Item label="16" value={"16"}></Picker.Item>
            <Picker.Item label="18" value={"18"}></Picker.Item>
          </Picker>
          <Text style={{ textAlign: "center" }}>Sortowanie</Text>
          <Picker
            style={{ marginHorizontal: "20%" }}
            selectedValue={this.state.sortings}
            onValueChange={async (val, index) => {
              this.setState({
                sortings: val,
              });
            }}
          >
            <Picker.Item label="ASC" value="ASC"></Picker.Item>
            <Picker.Item label="DESC" value="DESC"></Picker.Item>
          </Picker>

          <DSButton
            buttonText="Zapisz"
            style={{ height: 50, marginTop: 50 }}
            onPress={() => {
              this.saveSettings();
            }}
          ></DSButton>
        </View>
      </SafeAreaView>
    );
  }
}
