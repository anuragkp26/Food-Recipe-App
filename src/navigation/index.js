import { View, Text } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="welcome" component={WelcomeScreen} />

        <Stack.Screen name="home" component={HomeScreen} />

        <Stack.Screen name="details" component={RecipeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
