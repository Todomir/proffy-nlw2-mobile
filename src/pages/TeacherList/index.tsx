import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/server';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function handleToggleFilters() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function searchTeachers() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys disponíveis'
        headerRight={
          <BorderlessButton onPress={handleToggleFilters}>
            <Feather name='filter' size={20} color='#fff' />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor='#c1bccc'
              placeholder='Qual a matéria?'
              style={styles.input}
              value={subject}
              onChangeText={(text) => {
                setSubject(text);
              }}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor='#c1bccc'
                  style={styles.input}
                  placeholder='Qual o dia?'
                  value={week_day}
                  onChangeText={(text) => {
                    setWeekDay(text);
                  }}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor='#c1bccc'
                  style={styles.input}
                  placeholder='Qual horário?'
                  value={time}
                  onChangeText={(text) => {
                    setTime(text);
                  }}
                />
              </View>
            </View>

            <RectButton onPress={searchTeachers} style={styles.searchButton}>
              <Feather name='search' size={20} color='#fff' />
              <Text style={styles.searchButtonLabel}>Pesquisar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: ITeacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
