import { faFilm, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addVideoApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setAddStatus}) {

    const [show, setShow] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        caption: "",
        imgUrl: "",
        embededLink: ""
    })
    console.log(videoDetails);

    const handleCancel = () => {
        setVideoDetails({
            caption: "",
            imgUrl: "",
            embededLink: ""
        })
    }
    const handleAdd = async () => {
        const { caption, imgUrl, embededLink } = videoDetails // destructure
        if (!caption || !imgUrl || !embededLink) {
            // alert(`Fill the form completly`)
            toast.info(`Fill the form completely`)
        } else {
            // https://youtu.be/5BJDFKs41pI?si=wOv1m2-_-5Gchbkm
            if (embededLink.startsWith("https://youtu.be/")) {
                let link = `https://www.youtube.com/embed/${embededLink.slice(17, 28)}`
                console.log(link);

                const result = await addVideoApi({ caption, imgUrl, embededLink: link })
                console.log(result);
                if (result.status >= 200 && result.status < 300) {

                    // alert(`Media uploaded Successfully`)
                    toast.success(`Media uploaded Successfully`)
                    handleClose()
                    setAddStatus(result)

                } else {
                    // alert( `Something Went wrong`)
                    toast.warning(`Something Went wrong`)
                    handleCancel()
                }

            } else {
                // https://www.youtube.com/watch?v=5O5rVhAaf0U
                let link = `https://www.youtube.com/embed/${embededLink.slice(-11)}`
                console.log(link);

                const result = await addVideoApi({ caption, imgUrl, embededLink: link })
                console.log(result);
                if (result.status >= 200 && result.status < 300) {

                    // alert(`Media uploaded Successfully`)
                    toast.success(`Media uploaded Successfully`)
                    handleClose()
                    setAddStatus(result)

                } else {
                    // alert( `Something Went wrong`)
                    toast.warning(`Something Went wrong`)
                    handleCancel()
                }

            }

            // alert(`Successfull`)

            // https://www.youtube.com/watch?v=5BJDFKs41pI

            // https://youtu.be/5O5rVhAaf0U?si=CYDpoLdDutZRG_kO

            //<iframe width="853" height="480" src="https://www.youtube.com/embed/5BJDFKs41pI" title="Vidaamuyarchi - Sawadeeka Lyric | Ajith Kumar | Trisha | Magizh Thirumeni | Anirudh | Subaskaran" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            //<iframe width="853" height="480" src="https://www.youtube.com/embed/5O5rVhAaf0U" title="Best  BGM Score of Sushin Shyam | Original Sound Track | OST Jukebox" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        }

    }


    const handleClose = () => {
        setShow(false)
        handleCancel()
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <h4><span className='d-md-inline d-none' style={{ textDecoration: "none" }}>Upload New Video</span> <FontAwesomeIcon onClick={handleShow} icon={faUpload} className='ms-3' /></h4>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title className='text-warning'><FontAwesomeIcon icon={faFilm} className='me-3' />Upload Videos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Please fill the following details</p>
                    <form action="" className='border border-secondary p-3 rounded'>
                        <div className="mb-3"><input value={videoDetails.caption} onChange={(e) => setVideoDetails({ ...videoDetails, caption: e.target.value })} type="text" className='form-control' placeholder='Video Caption' /></div>
                        <div className="mb-3"><input value={videoDetails.imgUrl} onChange={(e) => setVideoDetails({ ...videoDetails, imgUrl: e.target.value })} type="text" className='form-control' placeholder='Video Image' /></div>
                        <div className="mb-3"><input value={videoDetails.embededLink} onChange={(e) => setVideoDetails({ ...videoDetails, embededLink: e.target.value })} type="text" className='form-control' placeholder='Video URL' /></div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={handleAdd}>
                        Upload
                    </Button>
                </Modal.Footer>
                <ToastContainer
                    position="top-center"
                    theme="colored"
                    autoClose={2000}
                />
            </Modal>

        </>
    )
}

export default Add