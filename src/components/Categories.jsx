import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoCard from './VideoCard';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addCategoryApi, deleteCategoryApi, getCategoryApi, updateCateogryApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Categories({uCStatus}) {

  const [categoryName, setCategoryName] = useState("")
  const [allCategory, setAllCategory] = useState([])
  const [categoryStatus, setCategoryStatus] = useState("")
  const [deleteStatus, setDeleteStatus] = useState([])
  const [updateCategoryStatus, setUpdateCategoryStatus] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(categoryName);

  const handleCancel = () => {
    setCategoryName("")
  }

  const handleAdd = async () => {
    if (!categoryName) {
      // alert(`Enter Category Name`)
      toast.warning( `Enter Category Name` )
    } else {
      const reqBody = {
        categoryName,
        allVideos: []
      }

      const result = await addCategoryApi(reqBody)
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        // alert(`Category added Successfully`)
        toast.success( `Category added Successfully` )
        setCategoryStatus(result)
        handleCancel()
        handleClose()
      } else {
        // alert(`Something Went Wrong`)
        toast.danger( `Something Went Wrong` )
      }
    }
  }

  const getCategory = async () => {
    const result = await getCategoryApi()
    console.log(result);
    if (result.status >= 200 && result.status < 300) {
      setAllCategory(result.data)

    }
  }
  console.log(allCategory);

  const handleDelete = async (id) => {
    const result = await deleteCategoryApi(id)
    console.log(result);
    if (result.status >= 200 && result.status < 300) {
      setDeleteStatus(result)
    }
  }

  const videoOver = (e) => {
    e.preventDefault()
  }

  const videoDrop = async (e, categoryDetails) => {
    // console.log(categoryDetails);

    const videoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"))
    // console.log(videoDetails);

    if (categoryDetails.allVideos.find((item) => item.id == videoDetails.id)) {
      // alert(`Video already added in the same category`)
      toast.warning(`Video already added in the same category`)
    } else {
      categoryDetails.allVideos.push(videoDetails)
      // console.log(categoryDetails);

      const result = await updateCateogryApi(categoryDetails.id, categoryDetails)
      // console.log(result);
      if (result.status >= 200 && result.status < 300) {
        setUpdateCategoryStatus(result)
      }



    }
  }

  const videoDrag = (e, videoDetails, categoryDetails)=>{
    // console.log(videoDetails, categoryDetails);

    const details = {
      videoDetails,
      categoryDetails
    }
    e.dataTransfer.setData("Details", JSON.stringify(details))
  }


  useEffect(() => {
    getCategory()
  }, [categoryStatus, deleteStatus, updateCategoryStatus, uCStatus])

  return (
    <>
      <h4>Category</h4>
      <button onClick={handleShow} className='btn btn-warning w-100 mt-4'>Add Category</button>


      {allCategory?.length > 0 ?
        allCategory?.map((item) => (
          <div className="border border-secondary p-3 mt-3" droppable onDragOver={(e) => videoOver(e)} onDrop={(e) => videoDrop(e, item)}>
            <div className="d-flex justify-content-between align-items-center p-3 rounded mt-4">
              <h5>{item?.categoryName}</h5>
              <Button onClick={() => handleDelete(item?.id)} variant="danger"><FontAwesomeIcon icon={faTrash} style={{ color: "white" }} /></Button>
            </div>

            {item?.allVideos.length > 0 &&
              item?.allVideos.map((video) => (
                <div draggable onDragStart={(e)=>videoDrag(e, video, item)}>
                  <VideoCard videoDetails={video} present={true} />
                </div>
              ))
            }

          </div>
        ))

        :
        <h5 className='text-center text-danger mt-5'>No Category Added</h5>}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='p-3 border rounded'>
            <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" placeholder='Enter Category Name' className='form-control' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
                          position="top-center"
                          theme="colored"
                          autoClose={2000}
                      />

    </>
  )
}

export default Categories