import { View } from "react-native";
import { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/data/airbnb-listings.json";
import listingsDataGeo from "@/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

export default function Page() {
  const [category, setCategory] = useState("Tiny homes");

  const listings = useMemo(() => listingsData as any, []);
  const geoItems = useMemo(() => listingsDataGeo as any, []);

  const onCategoryChanged = (categoryChanged: string) => {
    console.log("CHANGED_____________", category);
    setCategory(categoryChanged);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/[id]"}>Listing details</Link> */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />

      {/* <Listings listings={listings} category={category} /> */}
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={listings} category={category} />
    </View>
  );
}
