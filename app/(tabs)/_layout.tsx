import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {
            fontFamily: "mon-sb",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="whishlists"
          options={{
            tabBarLabel: "Whishlists",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            tabBarLabel: "Trips",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="airbnb" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            tabBarLabel: "Inbox",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person-circle-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;

const styles = StyleSheet.create({});
