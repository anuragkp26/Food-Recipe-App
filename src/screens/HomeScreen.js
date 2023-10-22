import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoriesList from "../components/categoriesList";
import { getCategories, getRecipes } from "../api/webservice";
import RecipeList from "../components/recipeList";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    async function fetchCategories() {
      const catList = await getCategories();
      setCategories(catList);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchRecipes() {
      const rList = await getRecipes(activeCategory);
      setRecipes(rList);
    }

    fetchRecipes();
  }, [activeCategory]);

  const categoryHandler = category => {
    setRecipes([])
    setActiveCategory(category)
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings */}
        <View className="mx-4 space-y-1 mb-2">
          <Text style={{ fontSize: hp(2.7) }} className="text-neutral-600">
            Hello, Anurag
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.6) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food
            </Text>
            <Text
              style={{ fontSize: hp(3.2) }}
              className="font-semibold text-neutral-600"
            >
              stay at <Text className="text-amber-400">home</Text>
            </Text>
          </View>
        </View>

        {/* Searchbar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(2) }}
            className="flex-1 text-base mb-1 px-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.7)} color="gray" strokeWidth={3} />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <CategoriesList
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={categoryHandler}
            />
          )}
        </View>

        {/* Recipies */}
        <View>
            {categories.length > 0  && (<RecipeList recipes={recipes}/>)}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
