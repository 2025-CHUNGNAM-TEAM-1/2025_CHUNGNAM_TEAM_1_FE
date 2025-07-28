import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SVGProfile1Act from '../assets/svgs/available_profiles/SVGProfile1Act';
import SVGProfile2Act from '../assets/svgs/available_profiles/SVGProfile2Act';
import SVGProfile3InAct from '../assets/svgs/unavailble_profiles/SVGProfile3InAct';
import SVGProfile4InAct from '../assets/svgs/unavailble_profiles/SVGProfile4InAct';
import SVGProfile5InAct from '../assets/svgs/unavailble_profiles/SVGProfile5InAct';
import SVGProfile6InAct from '../assets/svgs/unavailble_profiles/SVGProfile6InAct';

const characterList = [
  { id: 1, label: '선택가능', owned: true, Svg: SVGProfile1Act },
  { id: 2, label: '선택가능', owned: true, Svg: SVGProfile2Act },
  { id: 3, label: '6000P', owned: false, Svg: SVGProfile3InAct },
  { id: 4, label: '6000P', owned: false, Svg: SVGProfile4InAct },
  { id: 5, label: '7000P', owned: false, Svg: SVGProfile5InAct },
  { id: 6, label: '8000P', owned: false, Svg: SVGProfile6InAct },
];

export default function CharacterShop() {
  return (
    <View style={styles.grid}>
      {/* 윗줄: id 1,2,3 */}
      <View style={styles.row}>
        {characterList.slice(0,3).map((char) => (
          <TouchableOpacity
            key={char.id}
            style={[
              styles.charBtn,
              char.owned ? styles.owned : styles.locked,
            ]}
            disabled={!char.owned}
          >
            <View style={styles.svgWrapper}>
              <char.Svg width={48} height={48} />
            </View>
            <Text style={styles.caption}>{char.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 아랫줄: id 4,5,6 */}
      <View style={styles.row}>
        {characterList.slice(3).map((char) => (
          <TouchableOpacity
            key={char.id}
            style={[
              styles.charBtn,
              char.owned ? styles.owned : styles.locked,
            ]}
            disabled={!char.owned}
          >
      
              <char.Svg width={48} height={48} />
           
            <Text style={styles.caption}>{char.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    alignItems: 'center',
    backgroundColor: '#efefef',
    padding: 16,
    borderRadius: 12,
    margin: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    paddingLeft: 72, // 오른쪽으로 이동!
  },
  charBtn: {
    width: 80,
    height: 100,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  caption: {
    marginTop: 8,
    fontSize: 13,
    color: '#222',
  },
  owned: { opacity: 1 },
  locked: { opacity: 0.5 },
});
