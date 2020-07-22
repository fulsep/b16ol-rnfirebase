import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [progress, changeProgress] = useState(false);

  const register = async (_email, _password) => {
    try {
      await auth().createUserWithEmailAndPassword(_email, _password);
    } catch (e) {
      Alert.alert(e.code);
    }
  };

  const onRegister = async () => {
    changeProgress(true);
    await register(email, password);
    changeProgress(false);
    Alert.alert('Success Register!');
    // navigation.navigate('login');
  };

  return (
    <View style={loginStyle.parent}>
      <Text style={loginStyle.title}>Register</Text>
      <View style={loginStyle.form}>
        <View style={loginStyle.input}>
          <TextInput
            onChangeText={changeEmail}
            style={loginStyle.inputField}
            placeholder={'Email'}
          />
        </View>
        <View style={loginStyle.input}>
          <TextInput
            onChangeText={changePassword}
            style={loginStyle.inputField}
            placeholder={'Password'}
          />
        </View>
        <View>
          <Button
            disabled={progress}
            onPress={onRegister}
            color="#000"
            title="Register"
          />
        </View>
      </View>
      <View style={loginStyle.registerLink}>
        <Text>Have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text>Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const loginStyle = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  form: {
    width: '100%',
    padding: 20,
  },
  input: {
    backgroundColor: '#888',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  inputField: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  registerLink: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
