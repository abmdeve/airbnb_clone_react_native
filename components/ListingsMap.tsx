import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { LISTING_GEO_TYPE } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();

  const onMarkerSelect = (item: LISTING_GEO_TYPE) => {
    console.log("ITEM MARKER SELECT", item);
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          latitude: geometry.coordinates[0],
          longitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
            }}
          >
            Test
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        //   style={styles.map}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: LISTING_GEO_TYPE) => {
          return (
            <Marker
              onPress={() => onMarkerSelect(item)}
              key={item.properties.id}
              coordinate={{
                latitude: +item.properties.latitude,
                longitude: +item.properties.longitude,
              }}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>
                  € {item.properties.price}{" "}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
});
