import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("ID LOCAL SEARCH PARAMS IN THE CONSOLE --->: ", id);
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
