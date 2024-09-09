import { View } from "react-native";
import { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/data/airbnb-listings.json";

export default function Page() {
  const [category, setCategory] = useState("Tiny homes");

  const listings = useMemo(() => listingsData as any, []);

  const onCategoryChanged = (categoryChanged: string) => {
    console.log("CHANGED_____________", category);
    setCategory(categoryChanged);
  };

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      {/* <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/[id]"}>Listing details</Link> */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />

      <Listings listings={listings} category={category} />
    </View>
  );
}
