import { useState } from 'react';
import { useNavigation, NavigationProp, useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';

type RootStackParamList = {
    Welcome: undefined;
    ClefSelection: undefined;
    Interface: { clef: string };
};
type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Welcome'>;

export default function ClefSelection() {
    const navigation = useNavigation<WelcomeScreenNavigationProp>();
    const [clef, setClef] = useState("");
    const { colors } = useTheme();
    let [fontsLoaded, fontError] = useFonts({
      JosefinSans_400Regular
    })

    if(!fontsLoaded && !fontError) {
      return null;
    }
    type Data = "label" | "value";
    const options: Record<Data, string>[] = [
        { label: "Treble", value: "treble" },
        { label: "Bass", value: "bass" }
    ];

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text, fontSize: 40 }}>Select clef to get started!</Text>
            <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value"
            data={options} placeholder="Select clef...." value={clef} onChange={item => setClef(item.value)}>
            </Dropdown>
            <Pressable style={[styles.button, { backgroundColor: colors.primary }]} 
            onPress={() => { navigation.navigate("Interface", { clef: clef })}}><Text>Go</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "JosefinSans_400Regular"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 4,
    }
});

const dropdownStyles = StyleSheet.create({
    dropdown: {
      margin: 16,
      width: 200,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
  });