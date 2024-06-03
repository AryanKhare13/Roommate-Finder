import React, { useState, createContext, useEffect } from "react";
import "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
export const UserContext = createContext();

const UserContextProvider = (props) => {
    const localData = localStorage.getItem("user");
    const data = localData ? JSON.parse(localData) : { accessToken: "" };

    const [user, setUser] = useState(data);

    const emailRegex = (input) => {
        let regex = /([a-zA-Z]+(\.[a-zA-Z]+)+)[0-9a-zA-Z]+@vitstudent\.ac\.in/gm;
        return regex.test(input);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (userFound) => {
            if (!userFound) {
                setUser({ accessToken: "" });
            } else {
                if (emailRegex(userFound.email))
                    setUser({
                        accessToken: userFound.accessToken,
                        displayName: userFound.displayName,
                        email: userFound.email
                    })
                else {
                    setUser({ accessToken: "" });
                }
            }
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
