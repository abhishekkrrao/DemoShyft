import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, RefreshControl } from "react-native";

function App(props) {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setRecord] = useState([]);
    const [checkedRecord, setCheckedRecord] = useState([]);
    const onRefreshApp = () => {
        resetApp();
        setRefreshing(false);
    }

    useEffect(() => {
        let result = randomArrayShuffle(alphabet);
        setRecord(result);
    }, []);

    const resetApp = () => {
        let result = data.map((obj, pos) => {
            obj.isVisible = false;
            obj.color = "#CCC";
            return obj;
        });
        setRecord(result);
    }
    const mItems = (item, index) => {
        return (
            <View style={{ width: "47%", backgroundColor: (item?.color && item?.isVisible == true) ? item?.color : "#CCC", margin: 5, padding: 20, height: 98 }}>
                <Pressable
                    style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                        console.log("called");

                        let checkedItems = data.filter((obj) => { return obj.isVisible == true; });
                        console.log(checkedItems);
                        setCheckedRecord(checkedItems);
                        if (checkedItems.length < 2) {
                            let result = data.map((obj, pos) => {
                                (pos == index) ? obj.isVisible = true : "";
                                (pos == index) ? obj.color = "#D92A55" : "#CCC";
                                return obj;
                            });
                            setRecord(result);
                        }
                        if (checkedRecord.length == 2) {
                            console.log("called1");
                            const uniqueValues = new Set(checkedRecord.map(v => v.name));
                            console.log(uniqueValues)
                            if (uniqueValues.size < checkedRecord.length) {
                                let result = data.map((obj, pos) => {
                                    obj.color = "#008000";
                                    return obj;
                                });
                                setRecord(result);
                            } else {
                                resetApp();
                            }
                        } else if (checkedRecord.length > 2) {
                            resetApp();
                        }
                    }}>
                    {item?.isVisible == true && <Text style={styles.text}>{item?.name.toString().toUpperCase()}</Text>}
                </Pressable>
            </View>
        )
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { padding: 20 }]}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                onRefreshApp();
                            }} />
                    }
                    style={{ alignSelf: 'center', width: '100%' }}
                    numColumns={2}
                    data={data}
                    renderItem={({ item, index }) => {
                        return mItems(item, index)
                    }}
                    keyExtractor={({ index }) =>
                        index +
                        '' +
                        new Date().getTime().toString() +
                        Math.floor(
                            Math.random() * Math.floor(new Date().getTime()),
                        ).toString()
                    }
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    text: { fontSize: 21, fontStyle: "normal", fontWeight: "900" }

});
export default App;
function randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
const alphabet = [{ name: "a", isVisible: false }, { name: "b", isVisible: false }, { name: "c", isVisible: false },
{ name: "d", isVisible: false }, { name: "e", isVisible: false },
{ name: "f", isVisible: false }, { name: "g", isVisible: false },
{ name: "h", isVisible: false }, { name: "a", isVisible: false },
{ name: "b", isVisible: false }, { name: "c", isVisible: false },
{ name: "d", isVisible: false }, { name: "e", isVisible: false },
{ name: "f", isVisible: false }, { name: "g", isVisible: false },
{ name: "h", isVisible: false }];