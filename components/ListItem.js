import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.reloadList = props.reloadList;
    this.state = {
      name: props.item.name,
      note: props.item.note,
      date: props.item.date,
      backgroundColor: "#" + props.item.backgroundColor,
      fontColor: "#" + props.item.fontColor,
      key: props.item.key,
      fontSize: props.fontSize,

      category: props.item.category,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    if (
      this.props.item.name !== prevProps.item.name ||
      this.props.item.note !== prevProps.item.note ||
      this.props.item.category !== prevProps.item.category ||
      prevProps.fontSize !== this.props.fontSize
    ) {
      this.setState({
        name: this.props.item.name,
        note: this.props.item.note,
        category: this.props.item.category,
        fontSize: this.props.fontSize,
      });
    }
  }

  askDelete() {
    Alert.alert("Czy na pewno chcesz usunac?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await SecureStore.deleteItemAsync(this.state.key);
          alert("Usunieto!");
          this.reloadList();
        },
      },
    ]);
  }

  loadNoteEdition() {
    this.navigation.navigate("Edytuj", { navigation: this.navigation, key: this.state.key });
  }

  render() {
    const range = 16777215 / 2;
    const bc = this.state.backgroundColor.slice(1);
    const colorNumber = parseInt(bc, 16);
    const fontColor = colorNumber > range ? "000000" : "ffffff";

    return (
      <TouchableOpacity
        onLongPress={() => {
          this.askDelete();
        }}
        onPress={() => {
          this.loadNoteEdition();
        }}
        style={{
          backgroundColor: this.state.backgroundColor,
          flex: 1,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", textAlign: "left", marginBottom: 20, flex: 1, color: "#" + fontColor, fontSize: this.state.fontSize }}>{this.state.category}</Text>
            <Text style={{ fontWeight: "bold", textAlign: "right", marginBottom: 20, flex: 1, color: "#" + fontColor }}>{new Date(this.state.date).toLocaleDateString("pl-PL")}</Text>
          </View>

          <Text style={{ color: "#" + fontColor, fontSize: this.state.fontSize }}> {this.state.name} </Text>
          <Text style={{ color: "#" + fontColor, fontSize: this.state.fontSize }}> {this.state.note} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
