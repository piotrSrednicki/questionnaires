import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import QuestionnaireService from 'services/QuestionnaireService.js';
import ErrorPopup from 'components/errorPopup/ErrorPopup.jsx';

export default function QuestionnaireDetail({
  questionnaire: initialQuestionnaire,
  onClose,
  setGlobalError,
}) {
  const [questionnaire, setQuestionnaire] = useState(initialQuestionnaire);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const colourMap = {
    czerwony: 'red',
    zielony: 'green',
    niebieski: 'blue',
    żółty: 'yellow',
    fioletowy: 'purple',
  };

  useEffect(() => {
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        const response = await QuestionnaireService.get(initialQuestionnaire.id);
        if (!isMounted) return;
        setQuestionnaire(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setGlobalError('Ankieta już nie istnieje');
          navigate('/');
        } else {
          setErrorMessage('Nie udało się pobrać szczegółów ankiety');
          onClose();
        }
      }
    };

    fetchLatest();

    return () => {
      isMounted = false;
    };
  }, [initialQuestionnaire.id, navigate, onClose, setGlobalError]);

  if (!questionnaire) return null;

  return (
    <>
      <div className='questionnaire-detail-backdrop'>
        <div className='questionnaire-detail'>
          <h3>Szczegóły ankiety</h3>
          <p>Wiek: {questionnaire.age}</p>
          <p>Płeć: {questionnaire.sex}</p>
          <p>Wzrost: {questionnaire.height} cm</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Kolor:
            <span
              className='questionnaire-color-box'
              style={{
                backgroundColor: colourMap[questionnaire.favourite_colour] || 'transparent',
              }}
            />
            <span>{questionnaire.favourite_colour}</span>
          </p>
          <button onClick={onClose}>Zamknij</button>
        </div>
      </div>

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />
    </>
  );
}

QuestionnaireDetail.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func.isRequired,
};
