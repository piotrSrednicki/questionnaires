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
            style={{ backgroundColor: colourMap[questionnaire.favourite_colour] || 'transparent' }}
          />
          <span>{questionnaire.favourite_colour}</span>
        </p>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
}

QuestionnaireDetail.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
