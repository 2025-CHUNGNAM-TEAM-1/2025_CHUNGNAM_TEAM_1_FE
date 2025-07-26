import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { getProfile, updateProfileName, purchaseProfileImage } from '../../utils/profileApi';
import SVGDefaultProfile from '../../assets/svgs/available_profiles/SVGDefaultProfile'
import SVGProfile1Act from '../../assets/svgs/available_profiles/SVGProfile1Act';
import SVGProfile2Act from '../../assets/svgs/available_profiles/SVGProfile1Act';
import SVGProfile3Act from '../../assets/svgs/available_profiles/SVGProfile3Act';
import SVGProfile4Act from '../../assets/svgs/available_profiles/SVGProfile4Act';
import SVGProfile5Act from '../../assets/svgs/available_profiles/SVGProfile5Act';
import SVGProfile6Act from '../../assets/svgs/available_profiles/SVGProfile6Act';

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
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');
  const [currentPoints, setCurrentPoints] = useState(0);
  const [profileImages, setProfileImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUserName(data.userName);
      setInputName(data.userName);
      setCurrentPoints(data.currentPoints);
      setProfileImages(data.profileImages);
      setCurrentImage(data.currentImageId);
    } catch (error) {
      Alert.alert('프로필 불러오기 실패', error.message);
    }
  };

  const handleNameChange = async () => {
    try {
      await updateProfileName(inputName);
      setUserName(inputName);
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

  const renderProfileImage = ({ item }) => (
    <TouchableOpacity
      disabled={item.owned || currentPoints < item.price}
      onPress={() => handlePurchaseImage(item.imageId, item.owned)}
      style={[
        styles.profileImgBtn,
        item.owned ? styles.owned : currentPoints < item.price ? styles.locked : styles.purchasable
      ]}
    >
      {/* 이미지는 직접 소스 연결 */}
      <View style={styles.profileImgPlaceholder} />
      <Text style={styles.imgCaption}>
        {item.owned ? '선택가능' : `${item.price}P`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 편집</Text>

        {/* 프로필 사진 구역 */}
        <View style={styles.profilePhotoWrapper}>
          {React.createElement(savedProfileSvgs[0], { width: 200, height: 200 })}
        </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputName}
          onChangeText={setInputName}
          placeholder="사용자 이름 변경"
        />
        <Button title="확인" onPress={handleNameChange} />
      </View>
      <FlatList
        data={profileImages}
        renderItem={renderProfileImage}
        horizontal={false}
        numColumns={3}
        keyExtractor={item => item.imageId}
        style={styles.profileImgList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  profilePhotoWrapper: { marginVertical: 32, alignItems: 'center' },
  profileImgPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#cfc' },
  title: { fontSize: 30, fontWeight: '600', marginBottom: 16, color: '#264C44', marginTop: 50 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  input: { borderWidth: 1, borderColor: '#cccccc', borderRadius: 8, padding: 8, marginRight: 8, minWidth: 160, backgroundColor: '#f6f6f6' },
  profileImgList: { marginTop: 16, width: '100%' },
  profileImgBtn: { margin: 8, alignItems: 'center', justifyContent: 'center', width: 80, height: 100 },
  imgCaption: { marginTop: 8, fontSize: 12 },
  owned: { opacity: 1 },
  purchasable: { opacity: 1 },
  locked: { opacity: 0.5 }
});

export default ProfileEditScreen;