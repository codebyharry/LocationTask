import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const CalculateDistancePage2 = ({route, navigation}) => {
  const {
    profilePic,
    latitude: savedLatitude,
    longitude: savedLongitude,
  } = route.params;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [distance, setDistance] = useState(null);

  const calculateDistance = () => {
    const distanceInKm = Math.sqrt(
      Math.pow(savedLatitude - latitude, 2) +
        Math.pow(savedLongitude - longitude, 2),
    ).toFixed(2);
    setDistance(distanceInKm);
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>My Uploaded Pic</Text>
      <Image source={{uri: profilePic}} style={styles.profilePic} />

      <TextInput
        style={styles.input}
        placeholder="Enter Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>
          Calculated Distance: {distance} km
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateDistance}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.previousButton}
          onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  distanceContainer: {
    marginVertical: 20,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  previousButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalculateDistancePage2;
