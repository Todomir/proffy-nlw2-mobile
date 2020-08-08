import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/server';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface ITeacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface ITeacherItemProps {
  teacher: ITeacher;
  favorited: boolean;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleWhatsappConnection() {
    api
      .post('connections', {
        user_id: teacher.id,
      })
      .then(() => {
        Linking.openURL(`whatsapp://send?phone=55${teacher.whatsapp}`);
      });
  }

  async function handleToggleFavorite() {
    const rawFavorites = await AsyncStorage.getItem('favorites');
    let favorites = [];

    if (rawFavorites) favorites = JSON.parse(rawFavorites);

    if (isFavorited) {
      const favoriteIndex = favorites.findIndex((teacherItem: ITeacher) => {
        return teacherItem.id === teacher.id;
      });

      favorites.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favorites.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>{`R$ ${teacher.cost},00`}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>
          <RectButton
            onPress={handleWhatsappConnection}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
