import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {AWS_S3_BUCKET_NAME} from '../awsSDK/aws';
import AWS from 'aws-sdk';

const CalculateDistance = ({route, navigation}) => {
  const {profilePic} = route.params;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSave = () => {
    if (!latitude || !longitude) {
      console.log('Please enter latitude and longitude.');
      return;
    }

    const data = {latitude, longitude};
    const jsonData = JSON.stringify(data);
    const key = `data-${Date.now()}.json`;

    const s3 = new AWS.S3();
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
      Body: jsonData,
      ContentType: 'application/json',
    };

    s3.putObject(params, (err, e) => {
      if (err) {
        console.error('Error uploading data to S3:', err);
      } else {
        console.log('Data uploaded successfully to S3:', e);
      }
    });
  };

  const handleNext = () => {
    navigation.navigate('CalculateDistancePage2', {
      profilePic,
      latitude,
      longitude,
    });
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
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.nextButton, !latitude || (!longitude && {opacity: 0.5})]}
        disabled={!latitude || !longitude}
        onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalculateDistance;
