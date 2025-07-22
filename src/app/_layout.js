import { Stack } from "expo-router";
import AuthWatcher from "../components/AuthWatcher";

export default function Layout() {
    return (
        <>
            
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </>
    );
}