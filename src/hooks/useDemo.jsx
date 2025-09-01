import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const DemoContext = createContext();

const DemoProvider = ({children}) => {
    const [demoState, setDemoState] = useState("demo");

    useEffect(() => {
        const loadDemoState = async () => {
            try {
                await AsyncStorage.setItem("demoState", demoState);
            } catch (error) {
                console.error("Failed to load demo state:", error);
            }
        }

        loadDemoState();
    }, [demoState]);

    return (
        <DemoContext.Provider value={{ demoState: demoState, setDemoState: setDemoState }}>
            {children}
        </DemoContext.Provider>
    )
}

const useDemo = () => {
    return useContext(DemoContext);
}

export { DemoProvider };
export default useDemo;