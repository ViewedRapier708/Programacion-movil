
import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Button } from 'react-native';
import { Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [qrData, setQrData] = useState(null);

  const validarLogin = () => {
    const validUser = 'admin';
    const validPass = '1234';
    if (user === validUser && pass === validPass) {
      Alert.alert('Correcto', 'Inicio de sesión exitoso');
      setLoggedIn(true);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const cambiarImagen = async () => {
    Alert.alert(
      'Seleccionar imagen',
      '¿Cómo quieres obtener la imagen?',
      [
        { text: 'Galería', onPress: seleccionarDeGaleria },
        { text: 'Cámara', onPress: abrirCamara },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const seleccionarDeGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a las imágenes');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const abrirCamara = async () => {
    if (!permission?.granted) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara');
        return;
      }
    }
    setShowCamera(true);
  };

  const abrirQRScanner = async () => {
    if (!permission?.granted) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara');
        return;
      }
    }
    setQrData(null);
    setShowQRScanner(true);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const usarFoto = () => {
    setImageUri(photo);
    setPhoto(null);
    setShowCamera(false);
  };

  const descartarFoto = () => {
    setPhoto(null);
    setShowCamera(false);
  };

  const onBarcodeScanned = ({ type, data }) => {
    // Solo procesar una vez
    if (showQRScanner && !qrData) {
      setQrData(data);
        Alert.alert(
          'QR detectado',
          `Abrir enlace:${data}`,
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => setShowQRScanner(false) },
            {
              text: 'Abrir',
              onPress: async () => {
                try {
                  const url = data.startsWith('http') ? data : `https://${data}`;
                  const supported = await Linking.canOpenURL(url);
                  if (supported) {
                    await Linking.openURL(url);
                  } else {
                    Alert.alert('No se puede abrir', url);
                  }
                } catch (e) {
                  Alert.alert('Error al abrir', String(e));
                } finally {
                  setShowQRScanner(false);
                }
              },
            },
          ]
        );
     
    }
  };

  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        {!photo ? (
          <>
            <CameraView ref={cameraRef} style={{ flex: 1 }} />
            <Button title="Tomar foto" onPress={takePhoto} />
            <Button title="Cancelar" onPress={() => setShowCamera(false)} />
          </>
        ) : (
          <>
            <Image source={{ uri: photo }} style={{ flex: 1 }} />
            <Button title="Usar esta foto" onPress={usarFoto} />
            <Button title="Tomar otra" onPress={() => setPhoto(null)} />
            <Button title="Cancelar" onPress={descartarFoto} />
          </>
        )}
      </View>
    );
  }

  if (showQRScanner) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={onBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        <View style={{ padding: 12 }}>
          <Button title="Cancelar" onPress={() => setShowQRScanner(false)} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!loggedIn ? (
        <View style={styles.box}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            placeholder="Usuario"
            style={styles.input}
            value={user}
            onChangeText={setUser}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            value={pass}
            onChangeText={setPass}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={validarLogin}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.box}>
          <Text style={styles.title}>Bienvenido {user}</Text>
          <TouchableOpacity onPress={cambiarImagen}>
            <Image
              source={{ uri: imageUri || 'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg' }}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={{ height: 12 }} />
          <TouchableOpacity style={styles.button} onPress={abrirQRScanner}>
            <Text style={styles.btnText}>Escanear QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={abrirCamara}>
            <Text style={styles.btnText}>Abrir Cámara</Text>
          </TouchableOpacity>
          {qrData ? (
            <Text style={{ marginTop: 10 }}>Último QR: {qrData}</Text>
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
});


