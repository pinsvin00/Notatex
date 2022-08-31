import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ListView from "../screens/ListView";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NoteView from "../screens/NoteView";
import SettingsView from "../screens/SettingsView";

const Stack = createStackNavigator();

export default function ListItemNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista notatek"
        component={ListView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edytuj"
        component={NoteView}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
