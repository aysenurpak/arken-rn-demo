import { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DeviceInfo from "react-native-device-info";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/screens/QrScannerScrennStyles";



const QRScannerScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const navigation = useNavigation();
    const cameraRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);

    const handleQrData = (data) => {
        console.log("QR Data:", data);
        setScanResult(data);
        alert(`QR Code: ${data}`);
    };

    useEffect(() => {
        const getPermission = async () => {
            if (!hasPermission) {
                const status = await requestPermission();
                console.log("Camera permission status:", status);
            }
            else {
                console.log("Camera permission already granted");
            }
        }

        getPermission();
    }, []);

    if (!hasPermission) return <SafeAreaView><Text>Camera permission not granted.</Text></SafeAreaView>
    if (device == null) return <SafeAreaView><Text>Loading camera...</Text></SafeAreaView>

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={{
                    codeTypes: ['qr', 'ean-13'],
                    onCodeScanned: (codes) => {
                        if (codes.length > 0 && !scanResult) {
                            handleQrData(codes[0].value);
                        }
                    },
                }}
            />

            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <Text style={styles.titleText}>Scan QR Code</Text>
                    <Text style={styles.subtitleText}>Point your camera at a QR code</Text>
                </View>

                <View style={styles.overlay}>
                    <View style={styles.scanArea} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QRScannerScreen;

