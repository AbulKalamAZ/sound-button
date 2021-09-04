/* eslint-disable no-unused-vars */
import firebase from "./config";

// File upload to storage method

export const fileUploadToStorage = (data) => {
  //Returning promise to handle later
  return new Promise(async (resolve, reject) => {
    //Get file
    const file = data.value;

    console.log("from fileUploadToStorage file", file);

    //Create refference
    if (file.name.endsWith("zip")) {
      let name = file.name.split(".")[0];
      const storageRef = firebase.storage().ref(`gltf/${name}`);

      //Upload File
      storageRef.put(file).then(() => {
        setTimeout(() => {
          firebase
            .storage()
            .ref(`gltf/${name}/scene.gltf`)
            .getDownloadURL()
            .then((url) => {
              resolve({ name: data.name, value: url });
              console.log("scene.gltf", url);
            });
        }, 5000);
      });
      //   let url = await storageRef.getDownloadURL();

      // Uploading file ends
    } else {
      const storageRef = firebase
        .storage()
        .ref(`${data.name}/${data.fileName}`);

      //Upload File
      await storageRef.put(file);
      let url = await storageRef.getDownloadURL();
      resolve({ name: data.name, value: url });
    }
  });
};

// Upload button data to the firestore
export const uploadButtonInfoToDatabase = (data) => {
  return new Promise((resolve, reject) => {
    //Get the data
    const buttonData = data;

    //Create a firestore refference

    const firestore = firebase.firestore();

    //Send request to database to store button data

    firestore
      .collection("buttons")
      .add(buttonData)
      .then((res) => {
        resolve(res);
      });
  });
};

// Fetching button data from firestore

export const fetchButtonData = (id) => {
  return new Promise((resolve, reject) => {
    // Get id
    const buttonId = id;

    // Creating firestore refference
    const firestore = firebase.firestore();

    // Send fetch request
    firestore
      .collection("buttons")
      .doc(buttonId)
      .get()
      .then((res) => {
        if (res.exists) {
          resolve(res.data());
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

// Method that return file format name

export const getFileFormatName = (fileName) => {
  let formatName = "";

  if (fileName) {
    formatName = fileName.split(".")[1];

    return formatName;
  } else {
    return formatName;
  }
};
