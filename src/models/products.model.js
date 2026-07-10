import { db } from "../config/firebase.js";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

const getNumericProductId = (value) => {
  const numericId = Number(value);
  return Number.isFinite(numericId) ? numericId : null;
};

const getSortedProducts = (snapshot) => {
  return snapshot.docs
    .map((productDoc) => ({
      docId: productDoc.id,
      ...productDoc.data(),
    }))
    .sort((firstProduct, secondProduct) => {
      const firstId = getNumericProductId(firstProduct.id);
      const secondId = getNumericProductId(secondProduct.id);

      if (firstId !== null && secondId !== null) {
        return firstId - secondId;
      }

      if (firstId !== null) {
        return -1;
      }

      if (secondId !== null) {
        return 1;
      }

      return String(firstProduct.docId).localeCompare(
        String(secondProduct.docId),
      );
    })
    .map((product) => {
      const { docId, ...publicProduct } = product;

      return {
        ...publicProduct,
        id: publicProduct.id ?? docId,
      };
    });
};

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  return getSortedProducts(snapshot);
};

export const getProductById = async (id) => {
  const productDoc = doc(productsCollection, id);
  const productSnapshot = await getDoc(productDoc);
  if (productSnapshot.exists()) {
    return {
      id: productSnapshot.data().id ?? productSnapshot.id,
      ...productSnapshot.data(),
    };
  }

  const snapshot = await getDocs(productsCollection);
  const matchingProduct = snapshot.docs.find((currentProductDoc) => {
    const dataId = currentProductDoc.data().id;
    return String(dataId) === String(id);
  });

  if (matchingProduct) {
    return {
      id: matchingProduct.data().id ?? matchingProduct.id,
      ...matchingProduct.data(),
    };
  }

  return null;
};

export const createProduct = async (productData) => {
  const snapshot = await getDocs(productsCollection);
  const currentIds = snapshot.docs
    .map((currentProductDoc) =>
      getNumericProductId(currentProductDoc.data().id),
    )
    .filter((currentId) => currentId !== null);

  const nextId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;
  const newProductData = { id: nextId, ...productData };

  await addDoc(productsCollection, newProductData);
  return newProductData;
};

export const updateProduct = async (id, updatedData) => {
  const snapshot = await getDocs(productsCollection);
  const productSnapshot = snapshot.docs.find((currentProductDoc) => {
    return (
      currentProductDoc.id === id ||
      String(currentProductDoc.data().id) === String(id)
    );
  });

  if (!productSnapshot) {
    return null;
  }

  await updateDoc(productSnapshot.ref, updatedData);
  return {
    id: productSnapshot.data().id ?? productSnapshot.id,
    ...updatedData,
  };
};

export const deleteProduct = async (id) => {
  const snapshot = await getDocs(productsCollection);
  const productSnapshot = snapshot.docs.find((currentProductDoc) => {
    return (
      currentProductDoc.id === id ||
      String(currentProductDoc.data().id) === String(id)
    );
  });

  if (!productSnapshot) {
    return null;
  }

  await deleteDoc(productSnapshot.ref);
};
