import React, { useState, useContext, useEffect } from 'react';
import styles from './Profile.module.css';
import editIcon from "../../assets/icons/editing (2).png"
import { UserContext } from "../../UserContext/UserContext.jsx";

import axios from 'axios';

const Profile = () => {
    const { user, fetchUserData ,setUser} = useContext(UserContext)
    const [userData, setUserData] = useState(user)
    const [dataUpdated, setDataUpdated] = useState({})
    const [loading, setLoading] = useState(true)
    const [editLoading, setEditLoading] = useState(false)

    const handleChange = (e) => {
        setDataUpdated((prevdata) => ({
            ...prevdata,
            [e.target.name]: e.target.value
        }))
        console.log(dataUpdated)
    };

    useEffect(() => {
        setDataUpdated(user)
        console.log("datat",dataUpdated)
    }, [user])


    const updateProfile = async () => {
        setEditLoading(true)
        try {
            const res = await axios.put(`http://localhost:5000/user/${user._id}`, dataUpdated,{
                withCredentials:true
            })
            if (res) {
                console.log(res.data)
                setUserData(res.data)
                setEditLoading(false)
                fetchUserData()

            }
            else {
                toast.error("Error updating your Profile Data!");
                console.log(res.data.message)
                setEditLoading(false)

            }
        }
        catch (error) {
            console.log("Catching an error while Fetching your profile" + error.message)
            setEditLoading(false)


        }
    }

    console.log(loading)


    // useEffect(() => {
    //     fetchUser()
    // }, [])

    return (
        <div className={styles.profilePage}>
            {/* <h1 className={styles.profileTitle}> My Profile</h1> */}
            <div className={styles.related__ItemP}>
                    {/* <div className={styles.backgroundP}></div> */}
                    <h2 className={styles.titleP}>My Profile</h2>
                </div>
            <div className={styles.profileContainer}>
                {user ? (
                    <>

                        <div className={styles.inputHolder}>
                            <label className={styles.field}>
                                <span className={styles.labelText}>Name</span>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    autoFocus
                                    className={styles.textField}
                                    name="name"
                                    defaultValue={user.name ? user.name : "N/A"}
                                />

                            </label>

                        </div>

                        <div className={styles.inputHolder}>
                            <label className={styles.field}>
                                <span className={styles.labelText}>Email</span>
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    autoFocus
                                    className={styles.textField}
                                    name="email"
                                    defaultValue={user.email}

                                />

                            </label>

                        </div>

                        <div className={styles.inputHolder}>
                            <label className={styles.field}>
                                <span className={styles.labelText}>Phone</span>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    autoFocus
                                    className={styles.textField}
                                    name="number"
                                    defaultValue={user.number ? user.number : "N/A"}

                                />

                            </label>

                        </div>

                        <div className={`${styles.addressField}`}>
                            <label className={styles.field}>
                                <span className={styles.labelText}>Address</span>
                                <input
                                    type="textarea"
                                    onChange={handleChange}
                                    className={`${styles.textField} ${styles.fieldWidth}`}
                                    name="address"
                                    defaultValue={user.address ? user.address : "N/A"}
                                    // rows={4}
                                    // cols={50}
                                />

                            </label>

                        </div>
                        <div className={styles.inputHolder}>
                            <label className={styles.field}>
                                <span className={styles.labelText}>Password</span>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    autoFocus
                                    className={styles.textField}
                                    name="password"
                                />

                            </label>
                        </div>
                        <div className={`${styles.inputHolder} ${styles.btnHolder}`}>
                            <span onClick={updateProfile} className={styles.editBtn}>
                                <img src={editIcon} className={styles.editPng} /> <span>{editLoading ? "loading" : "Edit"} </span></span>
                        </div>
                    </>
                ) : (
                    <h1>laoding.</h1>
                )}

            </div>
        </div>
    );
};

export default Profile;
