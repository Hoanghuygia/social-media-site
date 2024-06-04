import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "./firebase"; 

const uploadImage = async (file) => {
    const metadata = {
        contentType: file.type || "image/jpeg", 
    };
    const date = new Date().toISOString();

    const storageRef = ref(storage, `images/${date}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        reject("User doesn't have permission to access the object");
                        break;
                    case "storage/canceled":
                        reject("User canceled the upload");
                        break;
                    case "storage/unknown":
                        reject("Unknown error occurred, inspect error.serverResponse");
                        break;
                    default:
                        reject("An unknown error occurred");
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                }).catch((error) => {
                    reject("Failed to get download URL: " + error.message);
                });
            }
        );
    });
};

export default uploadImage;
