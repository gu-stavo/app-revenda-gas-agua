import React, { useRef, useState } from 'react';
import { View, FlatList, Animated} from 'react-native';
import Slides from './data.js';
import SliderItem from './slideItem.js';
import Pagination from './pagination.js';

const Slider = () => {

  const [index, setIndex] = useState(0);

  const scrollx = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            x: scrollx,
          },
        },
      },
    ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, 
  }).current;

  return (
    <View>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollx={scrollx} index={index} />
    </View>
  );
};

export default Slider;

