import React, { useState } from 'react';
import styles from './Profile.module.css';
import editIcon from "../../assets/icons/editing (1).png"
const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Click to edit me');
const [fieldEdited,setFieldEdited]=useState()
    const handleEditClick = (e,name) => {
  e.preventDefault()
        setFieldEdited(name)
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className={styles.profilePage}>
            <nav className={styles.navHolder}>

            </nav>
            <h1 className={styles.profileTitle}> My Profile</h1>
            <div className={styles.profileContainer}>

                <div className={styles.inputHolder}>

                    <label className={styles.field}>
                        <span className={styles.labelText}>Name</span>

                        {isEditing && fieldEdited==="Name" ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                            />
                        ) : (
                            <span >{text}</span>
                        )}
                    </label>
                    <span onClick={(e)=>handleEditClick(e,"Name")} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> Edit
                    </span>
                </div>

                {/* <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Email</span>
                        {isEditing ? (
                            <input
                                type="email"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                            />
                        ) : (
                            <span >{text}</span>
                        )}
                    </label>
                    <span onClick={handleEditClick} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> Edit </span>
                </div> */}

                {/* <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Password</span>
                        {isEditing ? (
                            <input
                                type="password"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                            />
                        ) : (
                            <span >********</span>
                        )}
                    </label>
                    <span onClick={handleEditClick} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> Edit </span>
                </div> */}

                {/* <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Phone</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                            />
                        ) : (
                            <span >{text}</span>
                        )}
                    </label>
                    <span onClick={handleEditClick} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> Edit </span>
                </div> */}

                {/* <div className={styles.inputHolder}>
                    <label className={styles.field}>
                        <span className={styles.labelText}>Address</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className={styles.textField}
                            />
                        ) : (
                            <span >{text}</span>
                        )}
                    </label>
                    <span onClick={handleEditClick} className={styles.editBtn}>
                        <img src={editIcon} className={styles.editPng} /> Edit </span>
                </div> */}

            </div>
        </div>
    );
};

export default Profile;
