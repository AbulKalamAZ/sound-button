import firebase from './config';

// File upload to storage method

export const fileUploadToStorage = (data) => {
    //Returning promise to handle later
    return new Promise((resolve, reject) => {
        //Get file
        const file = data.value;

        //Create refference
        const storageRef = firebase
            .storage()
            .ref(`${data.name}/${data.fileName}`);

        //Upload File
        storageRef.put(file).then((res) => {
            storageRef
                .getDownloadURL()
                .then((url) => {
                    resolve({ name: data.name, value: url });
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
        });
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
            .collection('buttons')
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
            .collection('buttons')
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
    let formatName = '';

    if (fileName) {
        formatName = fileName.split('.')[1];

        return formatName;
    } else {
        return formatName;
    }
};
