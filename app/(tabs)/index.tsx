import { View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View>
      {/* <Link href={'/(modals)login'}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/1227"}>Listing details</Link> */}
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/[id]"}>Listing details</Link>
    </View>
  );
}
