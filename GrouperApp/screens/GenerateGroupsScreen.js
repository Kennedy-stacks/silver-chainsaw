import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import shuffle from 'lodash.shuffle';

const lightTheme = {
  background: '#f8f9fa',
  card: '#ffffff',
  text: '#2d3436',
  secondaryText: '#636e72',
  border: '#e9ecef',
  primary: '#3584e4',
  success: '#33d17a',
  accent: '#f66151',
};

const darkTheme = {
  background: '#1e1e2e',
  card: '#2a2a3a',
  text: '#ffffff',
  secondaryText: '#b0b0b0',
  border: '#3a3a4a',
  primary: '#62a0ea',
  success: '#57e389',
  accent: '#ed333b',
};

export default function GenerateGroupsScreen({ route }) {
  const { students, numGroups } = route.params;
  const [groups, setGroups] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
     const [isDark, setIsDark] = useState(true); // Default to dark for now
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    if (students && students.length > 0 && numGroups && !isNaN(numGroups) && numGroups > 0) {
      generateRandomGroups();
    }
  }, []);

  const generateRandomGroups = () => {
    if (!numGroups || isNaN(numGroups) || numGroups <= 0) return;
    const shuffled = shuffle(students);
    const newGroups = [];
    const total = shuffled.length;
    const baseSize = Math.floor(total / numGroups);
    const remainder = total % numGroups;
    let index = 0;
    for (let i = 0; i < numGroups; i++) {
      const size = i < remainder ? baseSize + 1 : baseSize;
      newGroups.push(shuffled.slice(index, index + size));
      index += size;
    }
    setGroups(newGroups);
    setGroupNames(newGroups.map((_, index) => `Group ${index + 1}`));
  };

  const renderGroup = ({ item, index }) => (
    <View style={[styles.groupCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {editingIndex === index ? (
        <TextInput
          style={[styles.editInput, { color: theme.text, borderColor: theme.border }]}
          value={groupNames[index]}
          onChangeText={(text) => {
            const newNames = [...groupNames];
            newNames[index] = text;
            setGroupNames(newNames);
          }}
          onSubmitEditing={() => setEditingIndex(null)}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={() => setEditingIndex(index)} style={styles.groupHeader}>
          <Ionicons name="people" size={24} color={theme.primary} />
          <Text style={[styles.groupTitle, { color: theme.text }]}>{groupNames[index]}</Text>
        </TouchableOpacity>
      )}
      {item.map(student => (
        <View key={student.id} style={styles.studentRow}>
          <Ionicons name="person" size={16} color={theme.secondaryText} />
          <Text style={[styles.studentName, { color: theme.text }]}>{student.name}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsDark(!isDark)} style={[styles.toggleBtn, { backgroundColor: theme.card }]}>
          <Ionicons name={isDark ? "sunny" : "moon"} size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={[styles.headerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Your Groups</Text>
        {groups.length > 0 && (
          <TouchableOpacity
            style={[styles.shuffleBtn, { backgroundColor: theme.accent }]}
            onPress={generateRandomGroups}
          >
            <Ionicons name="shuffle" size={20} color="white" style={styles.btnIcon} />
            <Text style={styles.btnText}>Shuffle Again</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <TouchableOpacity
            style={[styles.generateBtn, { backgroundColor: theme.primary }]}
            onPress={generateRandomGroups}
          >
            <Ionicons name="bulb" size={24} color="white" style={styles.btnIcon} />
            <Text style={styles.btnText}>Generate Groups</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={groups.length === 0 ? styles.emptyContainer : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: 0, alignItems: 'center' },
  toggleContainer: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  toggleBtn: { padding: 10, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
   headerCard: { backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, marginBottom: 20, alignItems: 'center', width: '100%' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  shuffleBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  btnIcon: { marginHorizontal: 5 },
   groupCard: { backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20, marginVertical: 20, borderRadius: 12, borderWidth: 1, width: '50vw', alignItems: 'center' },
  groupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  groupTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  editInput: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, borderWidth: 1, borderRadius: 5, padding: 5 },
  studentRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  studentName: { fontSize: 16, marginLeft: 10 },
  generateBtn: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, flexDirection: 'row', alignItems: 'center', width: '50%' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});