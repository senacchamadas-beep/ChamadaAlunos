import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA77igx5tch4838pN3Cm7ZbgsbUi06qfKc",
  authDomain: "chamadasenac.firebaseapp.com",
  projectId: "chamadasenac",
  storageBucket: "chamadasenac.firebasestorage.app",
  messagingSenderId: "59267489670",
  appId: "1:59267489670:web:8ca2fe4376bb0013891607"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export {
  collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp
};

// Simple SHA-256 hash helper for aluno passwords
export async function hashSenha(senha) {
  const buf = new TextEncoder().encode(senha);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,"0")).join("");
}

// Session helpers (sessionStorage)
export const session = {
  setAluno(a){ sessionStorage.setItem("aluno", JSON.stringify(a)); },
  getAluno(){ const v=sessionStorage.getItem("aluno"); return v?JSON.parse(v):null; },
  setProfessor(){ sessionStorage.setItem("professor","1"); },
  getProfessor(){ return sessionStorage.getItem("professor")==="1"; },
  clear(){ sessionStorage.clear(); }
};
