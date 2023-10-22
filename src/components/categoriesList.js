import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { categoryData } from "../constants.js";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Animated, { FadeInDown } from "react-native-reanimated";

const CategoriesList = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          const isActive = cat.strCategory === activeCategory;
          // const activeButtonClass = isActive ? "border-solid border-2 border-amber-400" : "border-none";
          const activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";

          return (
            <TouchableOpacity
              key={cat.idCategory}
              className="flex items-center space-y-1"
              onPress={() => setActiveCategory(cat.strCategory)}
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                <Image
                  style={{ width: hp(6), height: hp(6) }}
                  source={cat.strCategoryThumb}
                  contentFit="fill"
                  className="rounded-full"
                />
                {/* <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                /> */}
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(2) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default CategoriesList;
