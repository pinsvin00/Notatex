import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class DSButton extends Component {
  constructor(props) {
    super(props);
    this.onPress = props.onPress;
    this.buttonText = props.buttonText;
    this.style = props.style;
  }

  render() {
    return (
      <TouchableOpacity style={{ ...{ marginHorizontal: 15, borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: "lightgray" }, ...this.style }} onPress={this.onPress}>
        <Text style={{ textAlign: "center", marginHorizontal: 10 }}>{this.buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

DSButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
