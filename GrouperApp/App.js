import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddStudentsScreen from './screens/AddStudentsScreen';
import GenerateGroupsScreen from './screens/GenerateGroupsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Grouper 🔥' }} />
        <Stack.Screen name="AddStudents" component={AddStudentsScreen} options={{ title: 'Add Class' }} />
        <Stack.Screen name="Generate" component={GenerateGroupsScreen} options={{ title: 'Groups' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}