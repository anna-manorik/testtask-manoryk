import type { CourseProps } from '../../types/TypesProps'
import "./CourseItem.css";
import ReactVideo from '../../react.mp4';
import ReactVideo2 from '../../react2.mp4';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { addItem, setCurrentTime, setPlayState } from '../../redux/slice';
import { toast } from 'react-toastify';
import debounce from "lodash/debounce";

const videosMap: Record<string, string> = {
  "react.mp4": ReactVideo,
  "react2.mp4": ReactVideo2,
};

const CourseItem = ({ id, title, description, videoUrl, price }: CourseProps) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<CourseProps>();
    const dispatch = useDispatch<AppDispatch>();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoState = useSelector((state: RootState) => id && state.video[id]);
    let lastUpdate = Date.now();

     useEffect(() => {
        if (videoRef.current && videoState) {
            videoRef.current.currentTime = videoState.currentTime;
            if (videoState.isPlaying) {
                videoRef.current.play();
            }
        }
    }, [id, openModal]);

    const handlePurchase = (courseId: number | undefined) => {
        try {
            dispatch(addItem({ id, title, price, quantity: 1 }))
            toast.success('Course was added to cart!');
        } catch (error) {
            console.log('Error during adding to Cart', error)
        }
    }

    const handleOpenModal = (course: CourseProps) => {
        setSelectedCourse(course);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        dispatch(setPlayState({ id, isPlaying: false }));
        
    };

    const handlePlay = () => {
        dispatch(setPlayState({ id, isPlaying: true }));
    };

    const handlePause = () => {
        dispatch(setPlayState({ id, isPlaying: false }));
    };

    const debouncedSave = useMemo(
        () =>
        debounce((time: number) => {
            dispatch(setCurrentTime({ id, currentTime: time }));
        }, 2000),
        [dispatch, id]
    );

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            debouncedSave(videoRef.current.currentTime);
        }
    };

    return (
        <>
           <div key={id} className='course-card'>
                 <p className="course-title" onClick={() => handleOpenModal({ id, title, description, videoUrl, price })}>{title}</p>
                 {videoUrl && (<video onClick={() => handleOpenModal({ id, title, description, videoUrl, price })} className="course-video">
                    <source src={videosMap[videoUrl.mp4 ?? "default.mp4"]} type="video/mp4" />
                 </video>)}
                 <p className="course-price">{price} $</p>
                 <button className='buy-btn' onClick={() => handlePurchase(id)}>BUY IT</button>
            </div>
            {openModal 
                && <div className='modal-overlay' onClick={() => handleCloseModal()}>
                    <div key={selectedCourse?.id} className='course-modal'>
                        <p className="course-title">{selectedCourse?.title}</p>
                        <p className="course-description">{selectedCourse?.description}</p>
                        {videoUrl && (<video onClick={() => setOpenModal(true)} className="course-video" controls  ref={videoRef} onPlay={handlePlay} onPause={handlePause} onTimeUpdate={handleTimeUpdate}>
                            <source src={videosMap[selectedCourse?.videoUrl.mp4 ?? "default.mp4"]} type="video/mp4" />
                        </video>)}
                        <p className="course-price">{selectedCourse?.price} $</p>
                        <button className='buy-btn' onClick={() => handlePurchase(selectedCourse?.id)}>BUY IT</button>
                    </div>
                </div>
            }
            
        </>
    )

}

export default CourseItem
