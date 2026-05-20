import * as Haptics from 'expo-haptics';

export const vibrateSuccess = async () => {

  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );
};

export const vibrateError = async () => {

  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Error
  );
};

export const vibrateSelection = async () => {

  await Haptics.selectionAsync();
};