import React, { useState, useContext, useEffect } from 'react';
import styles from './Profile.module.css';
import editIcon from "../../assets/icons/editing (1).png"
import { UserContext } from "../../UserContext/UserContext.jsx";

import axios from 'axios';

const Profile = () => {
    const { user, fetchUserData } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Click to edit me');
    const [userData, setUserData] = useState({})
    const [fieldEdited, setFieldEdited] = useState()
    const [dataUpdated,setDataUpdated]=useState({})
    const handleEditClick = (e, name) => {
        // e.preventDefault()
        console.log(name)
        console.log(isEditing)
        setFieldEdited(name)
        if(isEditing){
// console.log(isEditing)
            updateProfile()
        }
        else{
            setIsEditing(true)
            // console.log(isEditing)

        }
        // setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        // setText(e.target.value);
        setDataUpdated({[e.target.name]:e.target.value})
        
    };


    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/65aeda9492d779d70d079f29`)
            if (res) {
                console.log(res.data)
                setUserData(res.data)
                console.log(userData)
                setIsEditing(false)

            }
            else {
                toast.error("Error fetching your Profile Data!");
                console.log(res.data.message)
                setIsEditing(false)

            }
        }
        catch (error) {
            console.log("Catching an error while Fetching your profile" + error.message)
            setIsEditing(false)


        }
    }

    const updateProfile = async (name, value) => {
        // const data = { [name]: value }
        try {
            const res = await axios.put(`http://localhost:5000/user/65aeda9492d779d70d079f29`, dataUpdated)
            if (res) {
                console.log(res.data)
                setUserData(res.data)
                console.log(userData)
            }
            else {
                toast.error("Error updating your Profile Data!");
                console.log(res.data.message)
            }
        }
        catch (error) {
            console.log("Catching an error while Fetching your profile" + error.message)

        }
    }

    useEffect(() => {
        fetchUser()

    }, [])

    return (
        <div className={styles.profilePage}>
            <nav className={styles.navHolder}>

            </nav>
            <h1 className={styles.profileTitle}> My Profile</h1>

            <div className={styles.profileContainer}>

                <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Name</span>
                        {isEditing && fieldEdited === "name" ? (
                            <input
                                type="text"
                                defaultValue={userData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                                name="name"
                            />
                        ) : (
                            <span>{userData.name}</span>
                        )}
                    </label>
                    <span onClick={(e) => handleEditClick(e, "name")} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /><span>Edit</span>
                    </span>
                </div>

                <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Email</span>
                        {isEditing && fieldEdited === "email" ? (
                            <input
                                type="email"
                                defaultValue={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                                name="email"
                            />
                        ) : (
                            <span >{userData.email}</span>
                        )}
                    </label>
                    <span onClick={(e) => handleEditClick(e, "email")} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> <span>Edit </span></span>
                </div>

                <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Password</span>
                        {isEditing && fieldEdited === "password" ? (
                            <input
                                type="password"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                                name="password"
                            />
                        ) : (
                            <span >********</span>
                        )}
                    </label>
                    <span onClick={(e) => handleEditClick(e, "password")} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> <span>Edit </span></span>
                </div>

                <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Phone</span>
                        {isEditing && fieldEdited === "number" ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                                name="number"
                            />
                        ) : (
                            <span >{userData.number ? userData.number : "N/A"}</span>
                        )}
                    </label>
                    <span onClick={(e) => handleEditClick(e, "number")} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> <span>Edit </span></span>
                </div>

                <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Address</span>
                        {isEditing && fieldEdited === "address" ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                                name="address"
                            />
                        ) : (
                            <span >{userData.address ? userData.address : "N/A"}</span>
                        )}
                    </label>
                    <span onClick={(e) => handleEditClick(e, "address")} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> <span>Edit </span></span>
                </div>



            </div>
        </div>
    );
};

export default Profile;
