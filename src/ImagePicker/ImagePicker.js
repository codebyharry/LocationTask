// // components/ImagePicker.js
// import React, {useState} from 'react';
// import {View, Button, Image} from 'react-native';
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

// const ImagePickerComponent = ({onImageSelected}) => {
//   const [image, setImage] = useState(null);

//   const selectImage = () => {
//     const options = {
//       title: 'Select Profile Picture',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         console.log(response.assets[0].uri);
//         const source = {uri: response.assets[0].uri};
//         setImage(source);
//         onImageSelected(source); // Pass the selected image to the parent component
//       }
//     });
//   };

//   return (
//     <View>
//       {image && <Image source={image} style={{width: 200, height: 200}} />}
//       <Button title="Select Profile Picture" onPress={selectImage} />
//     </View>
//   );
// };

// export default ImagePickerComponent;
