import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';

const HomeScreen = () => {
  const navigate = useNavigate();
  const studentButtonRef = useRef(null);
  const professorButtonRef = useRef(null);
  const studentPopperRef = useRef(null);
  const professorPopperRef = useRef(null);
  const studentArrowRef = useRef(null);
  const professorArrowRef = useRef(null);
  const [showStudentPopper, setShowStudentPopper] = useState(false);
  const [showProfessorPopper, setShowProfessorPopper] = useState(false);
  const studentPopperStyles = usePopper(
    studentButtonRef.current,
    studentPopperRef.current,
    {
      placement: 'top',
      modifiers: [
        { name: 'arrow', options: { element: studentArrowRef.current } },
      ],
    }
  );
  const professorPopperStyles = usePopper(
    professorButtonRef.current,
    professorPopperRef.current,
    {
      placement: 'top',
      modifiers: [
        { name: 'arrow', options: { element: professorArrowRef.current } },
      ],
    }
  );

  const handleStudentMouseEnter = () => {
    setShowStudentPopper(true);
  };

  const handleStudentMouseLeave = () => {
    setShowStudentPopper(false);
  };

  const handleProfessorMouseEnter = () => {
    setShowProfessorPopper(true);
  };

  const handleProfessorMouseLeave = () => {
    setShowProfessorPopper(false);
  };

  const handleLoginProfessor = () => {
    navigate('/login-professor');
  };

  const handleLoginStudent = () => {
    navigate('/login-student');
  };
  return (
    <>
      <div className="home-screen">
        <div className="banner">
          <img src="/feedback.png" alt="Logo" className="logo" />
          <h1 className="title">Feedback App - Tehnologii WEB</h1>
        </div>
        <div className="header-text">
          <p className="tagline">
            Project made by: Balaceanu Costin, Mardar Ilinca and Ene Mihaela
          </p>
        </div>
        <div className="container-buttons">
          <div className="container-student">
            <button
              type="button"
              ref={studentButtonRef}
              className="login-button"
              onMouseEnter={handleStudentMouseEnter}
              onMouseLeave={handleStudentMouseLeave}
              onClick={handleLoginStudent}
            >
              Student 
            </button>
          </div>

          <div className="container-professor">
            <button
              type="button"
              ref={professorButtonRef}
              className="login-button"
              onMouseEnter={handleProfessorMouseEnter}
              onMouseLeave={handleProfessorMouseLeave}
              onClick={handleLoginProfessor}
            >
              Professor
            </button>
          </div>
        </div>

        
        <footer className="footer">
          <div>
            <span>
              <a href="/terms">Terms of Service & Privacy Policy</a>
            </span>
          </div>
        </footer>
      </div>
      <div className="popper-container">
        {showStudentPopper && (
          <div
            className="popper-text-student"
            ref={studentPopperRef}
            style={studentPopperStyles.popper}
            {...studentPopperStyles.popper}
            onMouseEnter={handleStudentMouseEnter}
            onMouseLeave={handleStudentMouseLeave}
          >
            <span>Click me if you are a Student</span>
            <div ref={studentArrowRef} style={studentPopperStyles.arrow} />
          </div>
        )}
        {showProfessorPopper && (
          <div
            className="popper-text-professor"
            ref={professorPopperRef}
            style={professorPopperStyles.popper}
            {...professorPopperStyles.popper}
            onMouseEnter={handleProfessorMouseEnter}
            onMouseLeave={handleProfessorMouseLeave}
          >
            <span>Click me if you are a Professor</span>
            <div ref={professorArrowRef} style={professorPopperStyles.arrow} />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
