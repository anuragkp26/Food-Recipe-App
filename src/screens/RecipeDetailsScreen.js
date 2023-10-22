import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { getRecipeDetails } from "../api/webservice";
import Loading from "../components/loading";

import YoutubePlayer from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { strMeal, strMealThumb, idMeal } = route.params;

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchRecipeDetails() {
      const recipe = await getRecipeDetails(idMeal);
      setRecipeDetails(recipe);
    }

    fetchRecipeDetails();
  }, []);

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 40,
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            marginTop: 4,
          }}
          source={strMealThumb}
          contentFit="cover"
          className="bg-black/5"
        />
      </View>

      {/* back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-12">
        <TouchableOpacity
          className="p-2 rounded-full ml-4 bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-4 bg-white"
          onPress={() => setIsFavorite((prv) => !prv)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {recipeDetails ? (
        <View className="px-4 flex justify-between space-y-4 pt-4">
          {/* name and area */}
          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-1">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipeDetails.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipeDetails.strArea}
            </Text>
          </Animated.View>

          {/* details */}
          <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)}  className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Serv
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  cal
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Ingrediants */}
          <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-1">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingrediants
            </Text>
            <View className="space-y-2 ml-3 pt-2">
              {ingredientsIndexes(recipeDetails).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(2) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {recipeDetails["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(2) }}
                        className="font-medium text-neutral-600"
                      >
                        {recipeDetails["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)}  className="space-y-1">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(2) }} className="text-neutral-700">
              {recipeDetails.strInstructions}
            </Text>
          </Animated.View>

          {/* youtube */}
          {recipeDetails.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubePlayer
                  height={hp(30)}
                  videoId={getYoutubeVideoId(recipeDetails.strYoutube)}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <Loading size="large" className="mt-20" />
      )}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;
