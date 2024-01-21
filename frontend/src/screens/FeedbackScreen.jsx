import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Modal from '../components/ModalFeedback';
import ModalFeedback from '../components/ModalFeedback';

const FeedbackScreen = () => {
  const location = useLocation();
  const activity = location.state.activity;
  //setez o val initiala pt emoticon
  const [emoticon, setEmoticon] = useState('smiley'); 
  const [professorName, setProfessorName] = useState('');
  //initializez isModalOpen
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    // requestul de api pt info despre prof
    axios
      .get(`http://localhost:5001/api/professors/${activity.professorId}`)
      .then((response) => {
        //setez numele profului ca state variable pt campul ca sa corespunda
        setProfessorName(response.data.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activity]); //  sa imi re run efectul cand se sch activ

  const handleSubmit = (event) => {
    event.preventDefault(); // un refresh 
    axios
      .post(`http://localhost:5001/api/activities/${activity.id}`, {
        activityId: activity.id,
        emoticon: emoticon,
      })
      .then((response) => {
        console.log(response);
        setIsModalOpen(true)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ModalFeedback show={isModalOpen} onHide={() => setIsModalOpen(false)} />
      <form onSubmit={handleSubmit}>
        <h1>{activity.title}</h1>
        <h2>Professor: {professorName}</h2>
        <div className="emoji-container">
          <div className="section">
            <div
              className={emoticon === 'smiley' ? 'emoji active' : 'emoji'}
              onClick={() => setEmoticon('smiley')}
            >
              <Image src="/smiley.png" className="emoji-image" />
            </div>
            <div
              className={emoticon === 'frowny' ? 'emoji active' : 'emoji'}
              onClick={() => setEmoticon('frowny')}
            >
              <Image src="/frowny.png" className="emoji-image" />
            </div>
          </div>
          <div className="section">
            <div
              className={emoticon === 'surprised' ? 'emoji active' : 'emoji'}
              onClick={() => setEmoticon('surprised')}
            >
              <Image src="/surprised.png" className="emoji-image" />
            </div>
            <div
              className={emoticon === 'confused' ? 'emoji active' : 'emoji'}
              onClick={() => setEmoticon('confused')}
            >
              <Image src="/confused.png" className="emoji-image" />
            </div>
          </div>
        </div>
        <button className='button-feedback' type="submit" onClick={() => setIsModalOpen(true)}>
          <span className="text-send">Send Feedback</span>
        </button>
      </form>
    </>
  );
};

export default FeedbackScreen;
