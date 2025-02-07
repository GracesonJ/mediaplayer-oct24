import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getVideoApi } from '../service/allApi'

function AllVideos({addStatus}) {

    const [videos, setVideos] = useState([])
    const [deleteStatus, setDeleteStatus]= useState([])
    const getAllVideos = async () => {
        const result = await getVideoApi()
        console.log(result);
        setVideos(result.data)

    }
    console.log(videos);


    useEffect(() => {
        getAllVideos()
    }, [addStatus, deleteStatus])



    return (
        <>
            <h2 className='mt-5'>All Videos</h2>

            {videos?.length > 0 ?
                <div className="container-fluid mt-5">
                    <div className="row">
                        {videos?.map((item) => (
                            <div className="col-md-3">
                                <VideoCard videoDetails = {item} setDeleteStatus={setDeleteStatus} />
                            </div>
                        ))
                        }
                    </div>
                </div>

                :

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <img src="https://png.pngtree.com/png-vector/20190320/ourmid/pngtree-vector-add-to-cart-vector-icon-png-image_850691.jpg" alt="" />
                            <h5 className='text-center text-danger'>No Videos Added Yet...</h5>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>}


        </>
    )
}

export default AllVideos