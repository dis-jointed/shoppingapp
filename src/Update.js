import React, { useState } from 'react'
import './Update.css'
import { db, storage } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import 'firebase/firestore';
import firebase from 'firebase/app';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Update() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    //const [Url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [ProductName, setProductName] = useState("");
    const [ProductDescription, setProductDescription] = useState("");
    const [ProductPrice, setProductPrice] = useState("");
   // const [image, setImage] = useState(null);
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    //const [Url, setUrl] = useState("");
    //const [progress, setProgress] = useState(0);
    const [open, setOpen] = useState(false); 

    const handleChange =(e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload =() => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function ...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    //post image inside db
                    db.collection("posts").add({
                       // timestamp: firebase.firestore.FieldValue.serverTimeStamp(),
                        name: ProductName,
                        description: ProductDescription,
                        price: ProductPrice,
                        imageUrl: url
                        //username: username
                    });

                    setProgress(0)
                    setProductName("")
                    setProductPrice("")
                    setProductDescription("")
                    setImage(null);
                } )
            }
        )
    }



    return (
        <div className='update'>

              

                <Modal
                open={open}
                onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>

                  <h1 className="modal__header">Update</h1>
                  <input type='file' onChange={handleChange}/>
                  <input className="modal__name" type='text'placeholder='Enter product name...' onChange={event => setProductName(event.target.value)} value={ProductName}/>
                  <textarea className="modal__description" type='text'placeholder='Enter product description...' onChange={event => setProductDescription(event.target.value)} value={ProductDescription}/>
                  <input className="modal__price" type='text'placeholder='Enter product price...' onChange={event => setProductPrice(event.target.value)} value={ProductPrice}/>
                  <progress className="image__uploadprogress" value={progress} max="100"/>
             
                    <Button className='imageupload__button' onClick={handleUpload}>
                Upload
            </Button>
                </div>
            </Modal>
          
            <button className='image__button' onClick={() => setOpen(true)}>
                Upload
            </button>

        </div>
    )
}


export default Update
