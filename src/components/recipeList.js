import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from 'expo-image';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants.js";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading.js";
import { useNavigation } from "@react-navigation/native";

const RecipeList = ({ recipes }) => {

  const navigation = useNavigation()

  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {recipes.length > 0 ? (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation}/>}
            //refreshing={isLoadingNext}
            //onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //onEndReached={() => loadNext(ITEM_CNT)}
          />
        ) : (
          <Loading size="large" className="mt-20" />
        )}
      </View>
    </View>
  );
};

export default RecipeList;

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  let h = index % 3 == 0 ? hp(25) : hp(35);

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(600).springify().damping(20)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={()=> navigation.navigate("details", {...item})}
      >
        <Image
        style={{ width: "100%", height: h, borderRadius: 35 }}
        source={item.strMealThumb}
        contentFit="cover"
        className="bg-black/5"
      />
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: "100%", height: h, borderRadius: 35 }}
          className="bg-black/5"
          
        /> */}
        <Text
          style={{ fontSize: hp(2),  }}
          className="font-semibold mx-2 text-neutral-600"
          numberOfLines={1}
        >
          {item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
