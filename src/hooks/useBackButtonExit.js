import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import React, { useState } from 'react';

// 뒤로가기 막기 + 앱 종료 (두 번 누르기, Alert 안내)
export default function useBackButtonExit() {
  const [exitCount, setExitCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (exitCount === 0) {
          Alert.alert(
            '앱 종료',
            '앱을 종료하시겠습니까?',
            [
              {
                text: '아니요',
                onPress: () => setExitCount(0),
                style: 'cancel',
              },
              { text: '예', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: true }
          );
          setExitCount(1);

          setTimeout(() => setExitCount(0), 2000);
          return true; // 뒤로가기 이벤트 처리(막기)
        } else {
          BackHandler.exitApp(); // 2초 이내 두 번 누르면 곧바로 종료
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [exitCount])
  );
}