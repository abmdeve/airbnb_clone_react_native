import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import BtnConnexion from "@/components/btnConnexion";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Stragy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (stragy: Stragy) => {
    const selectedAuth = {
      [Stragy.Google]: googleAuth,
      [Stragy.Apple]: appleAuth,
      [Stragy.Facebook]: facebookAuth,
    }[stragy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log(
        "¤¤¤ FILE: LOGIN.TSX:31 ¤¤¤ ON SELECT AUTH µµµ CREATEDSESSIONID",
        createdSessionId
      );
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.log("OAUTH ERROR IS: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Login</Text> */}
      {/* INPUT COMPONENT */}
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      {/* BUTTON CONTINUE */}
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      {/* SEPARATOR */}
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}> or </Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      {/* BUTTON CONNEXION WITH PHONE */}
      <View style={{ gap: 20 }}>
        <BtnConnexion
          title="Phone"
          nameIcon={"call-outline"}
          onPress={() => console.log("first")}
        />
        <BtnConnexion
          title="Apple"
          nameIcon={"logo-apple"}
          onPress={() => onSelectAuth(Stragy.Apple)}
        />
        <BtnConnexion
          title="Google"
          nameIcon={"logo-google"}
          onPress={() => onSelectAuth(Stragy.Google)}
        />
        <BtnConnexion
          title="Facebook"
          nameIcon={"logo-facebook"}
          onPress={() => onSelectAuth(Stragy.Facebook)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },

  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Page;
