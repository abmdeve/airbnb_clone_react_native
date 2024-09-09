import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { CATEGORIES } from "@/data/categories";

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const itemRef = useRef<Array<TouchableOpacity | null>>([]);
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const selectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(CATEGORIES[index].name);
  };

  return (
    <SafeAreaView style={{ paddingVertical: 20, backgroundColor: "#fff" }}>
      {/* <SafeAreaView style={{ flex: 1, paddingVertical: 20 }}> */}
      <View style={styles.container}>
        {/* SEARCH AND FILTER COMPONENT */}
        <View style={styles.ationRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text style={{ fontFamily: "mon", color: Colors.grey }}>
                  Anywhere Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        {/* HORIZONTAL SCROLL COMPONENT */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORIES.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                ref={(el) => (itemRef.current[index] = el)}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
                onPress={() => selectCategory(index)}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={activeIndex === index ? "#000" : Colors.grey}
                />
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item.name}{" "}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // flex: 1,
    height: 130,
  },
  ationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 10,
    width: 200,
    flex: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  categoryTextActive: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: "#000",
  },
  categoryText: {},
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});
