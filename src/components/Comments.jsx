import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = ({id}) => {
  const [comment, setComment] = useState('');
  const [commentsData, setCommentsData] = useState([]);

  const addComment = async () => {
    const newsDoc = doc(db, 'News', id);
    const commentsDb = collection(newsDoc, 'Comments');
    auth.currentUser === null && toast.warning('You must be logged in to add a comment');
    try {
      auth.currentUser && await addDoc(commentsDb, {
        comment: comment,
        name: auth.currentUser.displayName,
        profilePic: auth.currentUser.photoURL
      })
      auth.currentUser && toast.success('Comment added');
    } catch (error) {
      console.error(error);
    }
    setComment('');
  }

  const showComments = async () => {
    const newsDoc = doc(db, 'News', id);
    const commentsDb = collection(newsDoc, 'Comments');
    try {
      const data = await getDocs(commentsDb);
      const comments = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setCommentsData(comments);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    showComments();
  }, [commentsData])

  return (
    <div className='flex flex-col p-5'>
      <div className="mb-6">
        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a comment:</label>
        <div className="flex">
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." required/>
          <button onClick={addComment} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add
          </button>
        </div>
      </div>
      <div>
        {commentsData.map((comment, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <img src={comment.profilePic} alt={comment.name} className="w-6 h-6 rounded-full mr-4"/>
              <p className="text-sm text-gray-600">{comment.name}</p>
            </div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white ml-10">{comment.comment}</h4>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Comments