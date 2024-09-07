import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

type BtnConnexionProps = {
  title: string;
  nameIcon: any;
  onPress: () => void;
};

const BtnConnexion = ({ title, nameIcon, onPress }: BtnConnexionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnOutline}>
      <Ionicons name={nameIcon} size={24} style={defaultStyles.btnIcon} />
      <Text>Contine With {title}</Text>
    </TouchableOpacity>
  );
};

export default BtnConnexion;

const styles = StyleSheet.create({
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
