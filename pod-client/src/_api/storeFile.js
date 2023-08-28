import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../firebase";


export const storageApi= {
    storeFile:async function (file) {
        console.log(displayName,"name")
        try{
            console.log(uid,"uid")
            const storage = getStorage();
            const fileId=Math.random().toString(36).substring(2,8+2);
            const storageRef = ref(storage, `/${fileId}`);
          
             const snapshot=await uploadBytes(storageRef, file)
             console.log(snapshot,"shote")
             return  `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`
              

            }catch(e){
                console.log(e)
            }




      }

}