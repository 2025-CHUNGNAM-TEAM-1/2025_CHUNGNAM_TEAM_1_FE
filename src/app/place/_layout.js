import { Stack } from 'expo-router';
import SVGBadgeAct from '../../assets/svgs/icons/SVGBadgeAct';
import SVGBadgeInact from '../../assets/svgs/icons/SVGBadgeInact';
import useBadgeStore from '../../stores/useBadgeStore';
import { View } from 'react-native';

function BadgeHeader() {
    const isBadgeActive = useBadgeStore(state => state.isBadgeActive);
    return (
        <View style={{
            width: 250,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {isBadgeActive
                ? <SVGBadgeAct width={32} height={32} />
                : <SVGBadgeInact width={32} height={32} />}
        </View>
    );
}

export default function Layout() {

    return <Stack
        screenOptions={{
            headerShown: true,
            animation: 'slide_from_right',
            title: '',
            headerTitle: () => <BadgeHeader />,
        }}
    />
}