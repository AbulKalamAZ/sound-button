import firebase from './config';

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
            storageRef.getDownloadURL().then((url) => {
                console.log('utility', url);
                resolve({ name: data.name, value: url });
            });
        });
    });
};
