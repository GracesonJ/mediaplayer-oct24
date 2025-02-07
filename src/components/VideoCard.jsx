import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { removeVideoApi } from '../service/allApi';

function VideoCard({videoDetails, setDeleteStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async(id)=>{
    const result = await removeVideoApi(id)
    console.log(result);

    if(result.status>=200 && result.status<300){
      setDeleteStatus(result)
    }
  }

  return (
    <>
      <Card style={{ width: '100%' }} >
        <Card.Img onClick={handleShow} variant="top" style={{ width: "100%", height: "300px" }} src={videoDetails?.imgUrl} />
        <Card.Body className='d-flex justify-content-between align-items-center'>
          <Card.Title>{videoDetails?.caption}</Card.Title>
          <Button onClick={()=>handleDelete(videoDetails?.id)} variant="danger"><FontAwesomeIcon icon={faTrash} style={{ color: "white" }} /></Button>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>M{videoDetails?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="480" src={`${videoDetails?.embededLink}?autoplay=1`} title="Marco - Blood (Gopuishere Remix) | Santhosh Venky | Ravi Basrur| Unni Mukundan| HaneefAdeni |Shareef" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default VideoCard