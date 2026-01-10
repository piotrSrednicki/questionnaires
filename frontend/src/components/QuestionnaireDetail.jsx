import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionnaireDetail({ questionnaire, onClose }) {
  const colourMap = {
    czerwony: 'red',
    zielony: 'green',
    niebieski: 'blue',
    żółty: 'yellow',
    fioletowy: 'purple',
  };

  return (
    <div className='questionnaire-detail'>
      <h3>Szczegóły ankiety</h3>
      <p>Wiek: {questionnaire.age}</p>
      <p>Płeć: {questionnaire.sex}</p>
      <p>Wzrost: {questionnaire.height} cm</p>
      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Kolor:
        <span
          style={{
            display: 'inline-block',
            width: '40px',
            height: '20px',
            backgroundColor: colourMap[questionnaire.favourite_colour] || 'transparent',
            border: '1px solid #000',
          }}
        />
        <span>{questionnaire.favourite_colour}</span>
      </p>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
}

QuestionnaireDetail.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
