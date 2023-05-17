import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0kzNU2HYJGDTEJiZq3yhjyNyiisfkioI",
  authDomain: "pruebasaber-ffce8.firebaseapp.com",
  projectId: "pruebasaber-ffce8",
  storageBucket: "pruebasaber-ffce8.appspot.com",
  messagingSenderId: "713053573326",
  appId: "1:713053573326:web:7123c8a63e818740dd809f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Consultar BDD
const bd = getFirestore();

export const createProducts = async () => {
  const promise = await fetch("./json/games.json");
  const games = await promise.json();
  games.forEach(async (prod) => {
    await addDoc(collection(bd, "games"), {
      title: prod.title,
      price: prod.price,
      category: prod.category,
      stock: prod.stock,
      launch: prod.launch,
      img: prod.img,
    });
  });
};

export const getProducts = async () => {
  const prods = await getDocs(collection(bd, "games"));
  const items = prods.docs.map((prod) => {
    return { ...prod.data(), id: prod.id };
  });
  return items;
};

export const getProduct = async (id) => {
  const prod = await getDoc(doc(bd, "games", id));
  const item = { ...prod.data(), id: prod.id };
  return item;
};

export const updateProduct = async (id, info) => {
  await updateDoc(doc(bd, "games", id), info);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(bd, "games", id));
};

export const createOrdenCompra = async (
  cliente,
  precioTotal,
  carrito,
  fecha
) => {
  const ordenCompra = await addDoc(collection(bd, "ordenCompra"), {
    cliente: cliente,
    items: carrito,
    precioTotal: precioTotal,
    fecha: fecha,
  });
  return ordenCompra;
};

export const getOrdenCompra = async (id) => {
  const ordenCompra = await getDoc(doc(bd, "ordenCompra", id));
  const item = { ...ordenCompra.data(), id: ordenCompra.id };
  return item;
};

export const deleteOrdenCompra = async (id) => {
  await deleteDoc(doc(bd, "ordenCompra", id));
};
