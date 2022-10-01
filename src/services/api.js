import db from "../config/database";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { API_KEY } from "../config/api";
import { postData } from "../helpers/api";
import { resetDate } from "./dates";

export const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const getDays = async (programId) => {
  const collectionRef = collection(db, "days");
  const q = query(collectionRef, where("programId", "==", programId));

  const querySnapshot = await getDocs(q);
  let daysData = [];
  querySnapshot.forEach((doc) => {
    daysData.push({ id: doc.id, ...doc.data() });
  });
  return daysData;
};

export const getWorkouts = async (programId, dayId, userId) => {
  const collectionRef = collection(db, "workouts");
  const q = query(
    collectionRef,
    where("programId", "==", programId),
    where("dayId", "==", dayId),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  let workoutsDate = [];

  querySnapshot.forEach((doc) => {
    workoutsDate.push({ id: doc.id, ...doc.data() });
  });

  return workoutsDate;
};

export const postDocument = async (data) => {
  try {
    const docRef = await addDoc(collection(db, data.collection), data.postData);
    return { id: docRef.id, ...data.postData };
  } catch (err) {
    throw err;
  }
};

export const updateDocument = async (updatedData, config) => {
  try {
    const documentRef = doc(db, config.collectionName, config.documentId);

    await updateDoc(documentRef, updatedData);
  } catch (err) {
    throw err;
  }
};

export const updateDocumentField = async (data) => {
  try {
    const docId = doc(db, data.collection, data.docId);
    await updateDoc(docId, { [data.updatedField]: data.updatedFieldValue });
  } catch (err) {
    throw err;
  }
};

export const userSignup = async (data) => {
  try {
    const idealSignupPostData = {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    };
    const response = await postData({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      postData: idealSignupPostData,
    })
      .then((data) => data)
      .then((responseData) => {
        if (!!responseData.error) {
          return responseData;
        }
        const userData = {
          id: responseData.localId,
          email: data.email,
          username: data.username,
          age: data.age,
          token: responseData.idToken,
        };

        postDocumentWithId({
          collection: "users",
          id: userData.id,
          postData: userData,
        }).catch((err) => console.error(err));
        return userData;
      });

    return response;
  } catch (err) {
    throw err;
  }
};

export const userLogin = async (data) => {
  try {
    const idealLoginPostData = {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    };

    const response = await postData({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      postData: idealLoginPostData,
    })
      .then((data) => data)
      .then(async (data) => {
        if (!!data.error) {
          return data;
        }
        const getUserResponse = await getDocumentWithId({
          collection: "users",
          id: data.localId,
        })
          .then((responseData) => ({ ...responseData, token: data.idToken }))
          .catch((err) => {
            throw err;
          });

        return getUserResponse;
      })
      .catch((err) => console.log("ERROR err: ", err));

    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteDocument = async (data) => {
  try {
    await deleteDoc(doc(db, data.collectionName, data.documentId));
  } catch (err) {
    throw err;
  }
};

const postDocumentWithId = async (data) => {
  try {
    await setDoc(doc(db, data.collection, data.id), data.postData);
    return data.postData;
  } catch (err) {
    throw err;
  }
};

export const getDocumentWithId = async (data) => {
  try {
    const docRef = doc(db, data.collection, data.id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? docSnap.data() : undefined;
  } catch (err) {
    throw err;
  }
};
