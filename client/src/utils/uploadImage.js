import { getDownloadURL, uploadBytesResumable, ref} from "firebase/storage"
import { storage } from "./firebae";

const uploadImage = async (file) => {
    const metadata = {
        contentType: "image/jpeg",
    };
    const date = new Date();

    const storageRef = ref(storage, `images/ ${date + file.name}`);
    // const storageRef = ref(storage, file.name);
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
                        reject("The storage is anaithorized");
                        break;
                    case "storage/canceled":
                        reject("The storage is anaithorized");
                        break;
                    case "storage/unknown":
                        reject("The storage is anaithorized");
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

export default uploadImage;
