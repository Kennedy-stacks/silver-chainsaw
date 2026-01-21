import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
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

export default function HomeScreen({ navigation }) {
   const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsDark(!isDark)} style={[styles.toggleBtn, { backgroundColor: theme.card }]}>
          <Ionicons name={isDark ? "sunny" : "moon"} size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="people-circle" size={80} color={theme.primary} style={styles.icon} />
        <Text style={[styles.title, { color: theme.text }]}>Let's group some students!</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate('AddStudents')}
        >
          <Ionicons name="add-circle" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Start New Class</Text>
        </TouchableOpacity>
        {/* Later: load saved classes button */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  toggleContainer: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  toggleBtn: { padding: 10, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  card: { backgroundColor: 'white', padding: 40, borderRadius: 12, borderWidth: 1, width: '50%', alignItems: 'center' },
  icon: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  button: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  buttonIcon: { marginRight: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});