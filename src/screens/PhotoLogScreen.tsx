import React, {useMemo, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Images} from '../assets';
import {HeaderBar} from '../components/HeaderBar';
import {OceanBackground} from '../components/OceanBackground';
import {PrimaryButton} from '../components/PrimaryButton';
import {SurfaceCard} from '../components/SurfaceCard';
import {colors, useScreenMetrics} from '../theme';
import type {PhotoLog} from '../types';

type Props = {
  logs: PhotoLog[];
  onAddLog: (log: PhotoLog) => void;
  onDeleteLog: (id: string) => void;
};

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export function PhotoLogScreen({
  logs,
  onAddLog,
  onDeleteLog,
}: Props): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState('');
  const metrics = useScreenMetrics();
  const canAdd = title.trim().length > 0 && imageUri.length > 0;

  const date = useMemo(() => {
    return new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
  }, []);

  const reset = () => {
    setTitle('');
    setImageUri('');
  };

  const openPicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });
    const asset = result.assets?.[0];
    if (asset?.uri) {
      setImageUri(asset.uri);
    }
  };

  const addLog = () => {
    if (!canAdd) {
      return;
    }
    onAddLog({
      id: `${Date.now()}`,
      title: title.trim(),
      date,
      imageUri,
    });
    reset();
    setModalVisible(false);
  };

  const close = () => {
    reset();
    setModalVisible(false);
  };
  const appendLetter = (letter: string) => {
    setTitle(current => {
      const shouldCapitalize = current.length === 0 || current.endsWith(' ');
      const value = shouldCapitalize ? letter : letter.toLowerCase();
      return `${current}${value}`;
    });
  };
  const appendSpace = () => {
    setTitle(current => {
      if (current.length === 0 || current.endsWith(' ')) {
        return current;
      }
      return `${current} `;
    });
  };
  const deleteLetter = () => {
    setTitle(current => current.slice(0, -1));
  };

  return (
    <OceanBackground>
      <View style={[styles.screen, {paddingTop: metrics.top}]}>
        <HeaderBar title="Diver Photo Log" icon="🖼️" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingHorizontal: metrics.gutter,
              paddingBottom: metrics.navHeight + metrics.bottom + 22,
            },
          ]}>
          {logs.length === 0 ? (
            <SurfaceCard style={styles.emptyCard}>
              <Image
                source={Images.sharkMascot}
                resizeMode="contain"
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>Information:</Text>
              <Text style={styles.emptyText}>
                It looks like your Diver Photo Log does not have any finds yet.
              </Text>
              <PrimaryButton
                title="Add first Log"
                onPress={() => setModalVisible(true)}
                style={styles.emptyButton}
              />
            </SurfaceCard>
          ) : (
            logs.map(log => (
              <SurfaceCard key={log.id} style={styles.logCard}>
                <View style={styles.logTop}>
                  <View style={styles.logTextBox}>
                    <Text numberOfLines={1} style={styles.logTitle}>
                      {log.title}
                    </Text>
                    <Text style={styles.logDate}>{log.date}</Text>
                  </View>
                  <Pressable
                    onPress={() => onDeleteLog(log.id)}
                    style={({pressed}) => [
                      styles.delete,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </Pressable>
                </View>
                <Image
                  source={{uri: log.imageUri}}
                  resizeMode="cover"
                  style={styles.logImage}
                />
              </SurfaceCard>
            ))
          )}
        </ScrollView>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={close}>
        <View style={styles.modalBackdrop}>
          <SurfaceCard
            style={[styles.modalCard, {marginHorizontal: metrics.gutter + 18}]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add photo log</Text>
              <Pressable hitSlop={12} onPress={close}>
                <Text style={styles.modalClose}>×</Text>
              </Pressable>
            </View>

            <Pressable onPress={openPicker} style={styles.pickBox}>
              {imageUri ? (
                <Image
                  source={{uri: imageUri}}
                  resizeMode="cover"
                  style={styles.pickImage}
                />
              ) : (
                <Text style={styles.pickIcon}>📸</Text>
              )}
            </Pressable>

            <TextInput
              value={title}
              placeholder="Name location"
              placeholderTextColor="rgba(255,255,255,0.58)"
              showSoftInputOnFocus={false}
              caretHidden
              contextMenuHidden
              style={styles.input}
            />

            <View style={styles.keyboard}>
              {keyboardRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keyboardRow}>
                  {row.map(letter => (
                    <KeyboardKey
                      key={letter}
                      label={letter}
                      onPress={() => appendLetter(letter)}
                    />
                  ))}
                </View>
              ))}
              <View style={styles.keyboardRow}>
                <KeyboardKey label="Clear" wide onPress={() => setTitle('')} />
                <KeyboardKey label="Space" extraWide onPress={appendSpace} />
                <KeyboardKey label="Del" wide onPress={deleteLetter} />
              </View>
            </View>

            <PrimaryButton
              title="Add first Log"
              disabled={!canAdd}
              onPress={addLog}
              style={styles.modalButton}
            />
          </SurfaceCard>
        </View>
      </Modal>
    </OceanBackground>
  );
}

function KeyboardKey({
  label,
  onPress,
  wide,
  extraWide,
}: {
  label: string;
  onPress: () => void;
  wide?: boolean;
  extraWide?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.key,
        wide && styles.keyWide,
        extraWide && styles.keyExtraWide,
        pressed && styles.keyPressed,
      ]}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        style={styles.keyText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    paddingTop: 24,
    gap: 16,
  },
  emptyCard: {
    alignItems: 'center',
    marginTop: 78,
    paddingHorizontal: 34,
    paddingVertical: 34,
  },
  emptyImage: {
    height: 92,
    width: 92,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 24,
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 26,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 36,
    width: 232,
  },
  logCard: {
    padding: 28,
  },
  logTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logTextBox: {
    flex: 1,
    paddingRight: 16,
  },
  logTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  logDate: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 8,
  },
  delete: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  deleteIcon: {
    fontSize: 22,
  },
  logImage: {
    borderRadius: 14,
    height: 152,
    marginTop: 18,
    width: '100%',
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 7, 15, 0.74)',
    flex: 1,
    justifyContent: 'center',
  },
  modalCard: {
    padding: 28,
    width: '100%',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  modalClose: {
    color: colors.text,
    fontSize: 32,
  },
  pickBox: {
    alignItems: 'center',
    backgroundColor: colors.input,
    borderRadius: 20,
    height: 152,
    justifyContent: 'center',
    marginTop: 36,
    overflow: 'hidden',
    width: '100%',
  },
  pickImage: {
    height: '100%',
    width: '100%',
  },
  pickIcon: {
    fontSize: 30,
  },
  input: {
    backgroundColor: colors.input,
    borderRadius: 20,
    color: colors.text,
    fontSize: 16,
    height: 62,
    marginTop: 16,
    paddingHorizontal: 24,
  },
  keyboard: {
    gap: 7,
    marginTop: 14,
  },
  keyboardRow: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  key: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderColor: colors.border,
    borderRadius: 9,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    minWidth: 25,
    paddingHorizontal: 5,
  },
  keyWide: {
    minWidth: 58,
  },
  keyExtraWide: {
    flex: 1,
    maxWidth: 142,
  },
  keyPressed: {
    backgroundColor: colors.green,
    transform: [{scale: 0.96}],
  },
  keyText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  modalButton: {
    alignSelf: 'center',
    marginTop: 22,
    width: 232,
  },
  pressed: {
    transform: [{scale: 0.96}],
  },
});
