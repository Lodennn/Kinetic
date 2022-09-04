import db from "../config/database";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { API_KEY } from "../config/api";

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

export const getWorkouts = async (programId, dayId) => {
  const collectionRef = collection(db, "workouts");
  const q = query(
    collectionRef,
    where("programId", "==", programId),
    where("dayId", "==", dayId)
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

export const updateDocumentField = async (data) => {
  try {
    console.log("updateDocumentField: ", data);
    const docId = doc(db, data.collection, data.docId);
    await updateDoc(docId, { [data.updatedField]: data.updatedFieldValue });
  } catch (err) {
    throw err;
  }
};

export const userLogin = async (data) => {
  try {
    const response = await fetch();
  } catch (err) {
    throw err;
  }
};

export const userSignup = async (data) => {
  try {
    const response = await postData({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      postData: data,
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const postData = async (config) => {
  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config.postData),
    });
    if (!response.ok) throw new Error("something went wrong!");

    return await response.json();
  } catch (err) {
    throw err;
  }
};
