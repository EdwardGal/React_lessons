import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCMc5QrLYS1mn2nw7iujbuG-bqCRN3h07Q",
	authDomain: "todosproject-433fb.firebaseapp.com",
	projectId: "todosproject-433fb",
	storageBucket: "todosproject-433fb.firebasestorage.app",
	messagingSenderId: "414813253276",
	appId: "1:414813253276:web:e5026f2b347e359d5d4759",
	databaseURL:
		"https://todosproject-433fb-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
