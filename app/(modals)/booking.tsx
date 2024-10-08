import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import DatePicker from "react-native-modern-datepicker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { PLACES } from "@/data/places";
import { GUESTS_GROUP } from "@/data/guests_group";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const router = useRouter();

  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setselectedPlace] = useState(0);
  const today = new Date().toISOString().substring(0, 10);
  const [groups, setGroups] = useState(GUESTS_GROUP);

  const onClearAll = () => {
    setselectedPlace(0);
    setOpenCard(0);
    setGroups(GUESTS_GROUP);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* <Text>BOOKING POINT YEAH...</Text> */}
      {/* WHERE */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.cardPreview}
            onPress={() => setOpenCard(0)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons name="search" size={20} color={Colors.black} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destination"
                  placeholderTextColor={Colors.grey}
                />
              </View>
            </Animated.View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 25,
                paddingLeft: 20,
                marginBottom: 30,
              }}
            >
              {PLACES.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => setselectedPlace(index)}>
                    <Image
                      source={item.img}
                      style={
                        selectedPlace === index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text
                      style={[
                        { paddingTop: 6, fontFamily: "mon" },
                        // selectedPlace === index
                        //   ? { fontFamily: "mon-sb" }
                        //   : { fontFamily: "mon" },
                        selectedPlace === index
                          ? { fontFamily: "mon-sb" }
                          : null,
                      ]}
                    >
                      {item.title}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>

      {/* WHEN  */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.cardPreview}
            onPress={() => setOpenCard(1)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              When's your trip?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                options={{
                  defaultFont: "mon",
                }}
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* WHO  */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.cardPreview}
            onPress={() => setOpenCard(2)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 2 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Who's coming?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.guestItem,
                      index + 1 < GUESTS_GROUP.length
                        ? styles.itemBorder
                        : null,
                    ]}
                  >
                    <View>
                      <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                        {item.count}{" "}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "mon",
                          fontSize: 14,
                          color: Colors.grey,
                        }}
                      >
                        {item.text}{" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups];
                          // newGroups[index].count--;
                          newGroups[index].count =
                            newGroups[index].count > 0
                              ? newGroups[index].count - 1
                              : 0;
                          setGroups(newGroups);
                        }}
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={26}
                          color={
                            groups[index].count > 0 ? Colors.grey : "#cdcdcd"
                          }
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontFamily: "mon",
                          fontSize: 16,
                          minWidth: 18,
                          textAlign: "center",
                        }}
                      >
                        {item.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups];
                          newGroups[index].count++;
                          setGroups(newGroups);
                        }}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={26}
                          color={Colors.grey}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </Animated.View>
          </>
        )}
      </View>

      {/* FOOTER BUTTON CLEAR ALL AND SEARCH */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onClearAll}
            style={{ justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={Colors.white}
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.dark,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-sb",
    fontSize: 20,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    backgroundColor: Colors.white,
    alignContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});

export default Page;
