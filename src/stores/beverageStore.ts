import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    async init() {
  const basesRef = collection(db, "bases");
  const basesSnap = await getDocs(basesRef);

  this.bases = [];
  basesSnap.forEach((docSnap) => {
    this.bases.push(docSnap.data() as BaseBeverageType);
  });
  this.currentBase = this.bases[0] ?? null;

  const syrupsRef = collection(db, "syrups");
  const syrupsSnap = await getDocs(syrupsRef);

  this.syrups = [];
  syrupsSnap.forEach((docSnap) => {
    this.syrups.push(docSnap.data() as SyrupType);
  });
  this.currentSyrup = this.syrups[0] ?? null;

  const creamersRef = collection(db, "creamers");
  const creamersSnap = await getDocs(creamersRef);

  this.creamers = [];
  creamersSnap.forEach((docSnap) => {
    this.creamers.push(docSnap.data() as CreamerType);
  });
  this.currentCreamer = this.creamers[0] ?? null;

  const beveragesRef = collection(db, "beverages");

  onSnapshot(beveragesRef, (snap) => {
    this.beverages = []; 

    snap.forEach((docSnap) => {
      this.beverages.push(docSnap.data() as BeverageType);
    });
  });
},
    async makeBeverage() {
  const id = Date.now().toString();

  const beverage: BeverageType = {
    id,
    name: this.currentName,
    temp: this.currentTemp,
    base: this.currentBase!,
    syrup: this.currentSyrup!,
    creamer: this.currentCreamer!,
  };

  const beverageDoc = doc(db, "beverages", id);

  await setDoc(beverageDoc, beverage);

  this.beverages.push(beverage);
  this.currentBeverage = beverage;

  this.currentName = "";
},

    showBeverage(bev: BeverageType) {
  if (!bev) return;

  this.currentBeverage = bev;
  this.currentName = bev.name;
  this.currentTemp = bev.temp;
  this.currentBase = bev.base;
  this.currentSyrup = bev.syrup;
  this.currentCreamer = bev.creamer;
},
  },
});
