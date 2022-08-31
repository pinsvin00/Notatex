import React from "react";
import { Image, StyleSheet, Text, View, Button, Settings } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainImage from "./assets/sus.jpg";
import Icon from "./assets/np.png";
import NoteView from "./screens/NoteView";
import ListView from "./screens/ListView";
import OptionIcon from "./assets/kebab.png";
import ListItemNavigator from "./navigators/ListNavigator";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import CategoryView from "./screens/CategoryView";
import { TouchableOpacity } from "react-native-gesture-handler";
import SettingsView from "./screens/SettingsView";

const Drawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

const imageSize = 100;
const iconSize = 20;

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={Icon} style={{ width: imageSize, height: imageSize }}></Image>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Informacje o aplikacji"
        style={{ marginTop: -5 }}
        icon={() => <Image source={Icon} style={{ width: iconSize, height: iconSize }}></Image>}
        onPress={() => alert("NotatexPOL ver 2")}
      />
    </DrawerContentScrollView>
  );
}

function NoteViewProxy({ navigation }) {
  return <NoteView navigation={navigation}></NoteView>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Lista notek"
          component={ListItemNavigator}
          options={({ navigation }) => ({
            headerTitle: (props) => <Text>Lista Notatek</Text>,
            drawerIcon: ({ focused, size }) => <Image source={Icon} style={{ width: iconSize, height: iconSize }} />,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Ustawienia");
                }}
              >
                <Image source={OptionIcon} style={{ width: iconSize, height: iconSize, marginRight: 5 }}></Image>
              </TouchableOpacity>
            ),
          })}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Dodaj notke"
          component={NoteViewProxy}
          options={{
            drawerIcon: ({ focused, size }) => <Image source={Icon} style={{ width: iconSize, height: iconSize }} />,
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Dodaj kategorię"
          component={CategoryView}
          options={{
            drawerIcon: ({ focused, size }) => <Image source={Icon} style={{ width: iconSize, height: iconSize }} />,
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Ustawienia"
          component={SettingsView}
          options={{
            drawerLabel: () => null,
            drawerItemStyle: { height: 0 },
          }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
