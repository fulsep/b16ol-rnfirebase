import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

import LoginScreen from './Login';
import RegisterScreen from './Register';

const Tabbed = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="maintab" component={MainScreen} />
  </Tabs.Navigator>
);

const MainScreen = () => {
  const user = auth().currentUser;

  const onLogout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      Alert.alert(e.code);
    }
  };
  return (
    <>
      <View style={mainStyle.parent}>
        <Text style={mainStyle.title}>{user.email}</Text>
        <Button title={'Logout'} onPress={onLogout} />
      </View>
    </>
  );
};

const mainStyle = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const Main = () => {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  const authCheck = _user => {
    setUser(_user);
    if (init) {
      setInit(false);
    }
  };
  useEffect(() => {
    const sub = auth().onAuthStateChanged(authCheck);
    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <>
            <Stack.Screen
              name="login"
              options={{title: 'Login'}}
              component={LoginScreen}
            />
            <Stack.Screen
              name="register"
              options={{title: 'Register'}}
              component={RegisterScreen}
            />
          </>
        )}
        {user && (
          <Stack.Screen
            name="main"
            options={{title: 'Chat App'}}
            component={Tabbed}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
