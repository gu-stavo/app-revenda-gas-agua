import { StyleSheet, Animated, View, Dimensions } from "react-native"
import React from "react"

const {width} = Dimensions.get('screen');

const Pagination = ({ data, scrollx, index }) => {
    return (
        <View style={styles.container}>
            {
                data.map((_, idx) => {
                    const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                    const dotWidth = scrollx.interpolate({
                        inputRange,
                        outputRange: [12, 30, 12],
                        extrapolate: 'clamp',
                    });

                    const backgroundColor = scrollx.interpolate({
                        inputRange,
                        outputRange: ['blue', 'white', 'blue'],
                        extrapolate: 'clamp',
                    });

                    return <Animated.View key={idx.toString()} style={[styles.dot, {width: dotWidth, backgroundColor},
                         idx == index && styles.dotActive,

                    ]} />;
                })
            }
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: 'orange',
    }
});