import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("users") 
      .onSnapshot(querySnapshot => {
        const usersData = [];
        querySnapshot.forEach(doc => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
        setLoading(false);
      }, error => {
        console.log("Firestore error:", error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return { users, loading };
};

export default useUsers;
