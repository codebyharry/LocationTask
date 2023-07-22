import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AWS_S3_BUCKET_NAME} from '../awsSDK/aws';
import {RNS3} from 'react-native-aws3';
import AWS from 'aws-sdk';

const UploadProfilePic = ({navigation}) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageSelect = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  const handleNext = async () => {
    if (!profilePic) {
      console.log('Please select a profile picture first.');
      return;
    }
    const file = {
      uri: profilePic,
      name: profilePic.split('/').pop(),
      type: 'image/jpeg',
    };

    const options = {
      keyPrefix: 'mobile/',
      bucket: AWS_S3_BUCKET_NAME,
      region: AWS.config.region,
      accessKey: AWS.config.credentials.accessKeyId,
      secretKey: AWS.config.credentials.secretAccessKey,
      successActionStatus: 201,
    };

    try {
      const response = await RNS3.put(file, options);
      if (response.status !== 201) {
        throw new Error('Failed to upload file to S3');
      }
      console.log('File uploaded to S3:', response.body.postResponse.location);

      navigation.navigate('CalculateDistance', {
        profilePicUrl: response.body.postResponse.location,
      });
    } catch (error) {
      console.error('Error uploading file to S3:', error);
    }
    navigation.navigate('CalculateDistance', {profilePic: profilePic});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageSelect}>
        {profilePic ? (
          <Image source={{uri: profilePic}} style={styles.profilePic} />
        ) : (
          <Text>Select Profile Picture</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.nextButton,
          {backgroundColor: profilePic ? '#2196F3' : 'grey'},
        ]}
        disabled={!profilePic}
        onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
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
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadProfilePic;
