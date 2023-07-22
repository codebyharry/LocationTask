// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UploadProfilePic from './updateProfilePic/UpdateProfilePic';
import CalculateDistance1 from './calculateDistance/CalculateDistance';
import CalculateDistance2 from './calculateDistance/CalculateDistance2';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UploadProfilePic">
        <Stack.Screen
          name="UploadProfilePic"
          component={UploadProfilePic}
          options={{title: 'Upload Profile Pic'}}
        />
        <Stack.Screen
          name="CalculateDistance"
          component={CalculateDistance1}
          options={{title: 'Calculate Distance Page 1'}}
        />
        <Stack.Screen
          name="CalculateDistancePage2"
          component={CalculateDistance2}
          options={{title: 'Calculate Distance Page 2'}}
        />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
