import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

export default function AddStudentsScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [numGroups, setNumGroups] = useState('');
   const [isDark, setIsDark] = useState(true);
  const inputRef = useRef(null);
  const theme = isDark ? darkTheme : lightTheme;

  const addStudent = () => {
    if (name.trim()) {
      setStudents([...students, { id: Date.now().toString(), name: name.trim(), gender: 'M', level: 'Med', leader: false }]);
      setName('');
      setTimeout(() => inputRef.current?.focus(), 100); // Auto-focus
    }
  };

  const renderStudent = ({ item }) => (
    <View style={[styles.studentItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Ionicons name="person" size={20} color={theme.primary} style={styles.studentIcon} />
      <Text style={[styles.studentText, { color: theme.text }]}>{item.name}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsDark(!isDark)} style={[styles.toggleBtn, { backgroundColor: theme.card }]}>
          <Ionicons name={isDark ? "sunny" : "moon"} size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={[styles.content, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.label, { color: theme.text }]}>Add Students</Text>
        <View style={[styles.inputContainer, { borderColor: theme.border }]}>
          <Ionicons name="person-add" size={20} color={theme.secondaryText} style={styles.inputIcon} />
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: theme.text }]}
            placeholder="Enter student name..."
            placeholderTextColor={theme.secondaryText}
            value={name}
            onChangeText={setName}
            onSubmitEditing={addStudent}
          />
        </View>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: theme.success }]}
          onPress={addStudent}
        >
          <Ionicons name="add" size={20} color="white" style={styles.btnIcon} />
          <Text style={styles.btnText}>Add Student</Text>
        </TouchableOpacity>
        <View style={[styles.inputContainer, { borderColor: theme.border }]}>
          <Ionicons name="grid" size={20} color={theme.secondaryText} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Number of groups (e.g., 3)"
            placeholderTextColor={theme.secondaryText}
            value={numGroups}
            onChangeText={setNumGroups}
            keyboardType="numeric"
          />
        </View>
      </View>

      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.secondaryText }]}>No students yet. Add some!</Text>}
        style={styles.list}
      />

      {(() => {
        const num = Number(numGroups);
        return students.length > 1 && !isNaN(num) && num > 0 && num <= students.length && (
          <TouchableOpacity
            style={[styles.generateBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('Generate', { students, numGroups: num })}
          >
            <Text style={styles.btnText}>Generate Groups →</Text>
            <Ionicons name="arrow-forward" size={20} color="white" style={styles.btnIcon} />
          </TouchableOpacity>
        );
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  toggleContainer: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  toggleBtn: { padding: 10, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  content: { backgroundColor: 'white', padding: 30, borderRadius: 12, borderWidth: 1, width: '100%', marginBottom: 20 },
  label: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 15, marginBottom: 15, borderRadius: 8 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  addBtn: { padding: 15, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  btnIcon: { marginHorizontal: 5 },
  studentItem: { padding: 15, marginVertical: 5, borderRadius: 8, borderWidth: 1, flexDirection: 'row', alignItems: 'center', width: '50%' },
  studentIcon: { marginRight: 10 },
  studentText: { fontSize: 16 },
  list: { flex: 1, width: '50%' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  generateBtn: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center', width: '50%' },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});