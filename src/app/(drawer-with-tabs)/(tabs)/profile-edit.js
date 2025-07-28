import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { updateProfileName, purchaseProfileImage } from '../../../utils/profileApi';
import SVGDefaultProfile from '../../../assets/svgs/available_profiles/SVGDefaultProfile'
import SVGProfile1Act from '../../../assets/svgs/available_profiles/SVGProfile1Act';
import SVGProfile2Act from '../../../assets/svgs/available_profiles/SVGProfile1Act';
import SVGProfile3Act from '../../../assets/svgs/available_profiles/SVGProfile3Act';
import SVGProfile4Act from '../../../assets/svgs/available_profiles/SVGProfile4Act';
import SVGProfile5Act from '../../../assets/svgs/available_profiles/SVGProfile5Act';
import SVGProfile6Act from '../../../assets/svgs/available_profiles/SVGProfile6Act';
import { useProfileStore } from '../../../stores/useProfileStore';
import useInput from '../../../hooks/useInput';
import UserNameInput from '../../../components/UserNameInput';
import CharacterShop from '../../../components/CharacterShop';

const savedProfileSvgs = [
  SVGDefaultProfile,
  SVGProfile1Act,
  SVGProfile2Act,
  SVGProfile3Act,
  SVGProfile4Act,
  SVGProfile5Act,
  SVGProfile6Act,
];

const ProfileEditScreen = () => {
  const { value: userName, onChange } = useInput('');
  const [inputName, setInputName] = useState('');
  const [profileImages, setProfileImages] = useState([]);
  const profile = useProfileStore((state) => state.profile);

  const handleNameChange = async () => {
    try {
      console.log(userName)
      await updateProfileName(userName);
      setInputName(userName);
      Alert.alert('이름이 변경되었습니다.');
    } catch (error) {
      Alert.alert('이름 변경 실패', error.message);
    }
  };

  const handlePurchaseImage = async (imageId, owned) => {
    if (!owned) {
      try {
        const res = await purchaseProfileImage(imageId);
        setProfileImages(res.profileImages);
        setCurrentImage(imageId);
      } catch (error) {
        Alert.alert('이미지 구매 실패', error.message);
      }
    } else {
      setCurrentImage(imageId);
    }
  };



  return (
    <View style={styles.container}>
      {/* 프로필 사진 구역 */}
      <View style={styles.profilePhotoWrapper}>
        {React.createElement(savedProfileSvgs[0], { width: 200, height: 200 })}
      </View>
      <Text style={styles.title}>{profile.userName}</Text>
      <View style={styles.inputRow}>
        <UserNameInput
          value={userName}
          onChange={onChange}
          placeholder="사용자 이름 변경"
          onCheck={handleNameChange}
        />
      </View>
      <CharacterShop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  profilePhotoWrapper: { alignItems: 'center' },
  profileImgPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#cfc' },
  title: { fontSize: 30, fontWeight: '600', marginTop: 16, color: '#264C44', textAlign: 'center', marginTop: -10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
});

export default ProfileEditScreen;