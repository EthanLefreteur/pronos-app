import * as LocalAuthentication
  from 'expo-local-authentication';

export const authenticateUser = async () => {

  const compatible =
    await LocalAuthentication.hasHardwareAsync();

  if (!compatible) {
    return false;
  }

  const enrolled =
    await LocalAuthentication.isEnrolledAsync();

  if (!enrolled) {
    return false;
  }

  const result =
    await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authentification requise',
      fallbackLabel: 'Utiliser le code PIN',
      disableDeviceFallback: false,
    });

  return result.success;
};