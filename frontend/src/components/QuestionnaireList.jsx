import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionnaireList({ questionnaires, onEdit, onDelete, onView }) {
  const colourMap = {
    czerwony: 'red',
    zielony: 'green',
    niebieski: 'blue',
    żółty: 'yellow',
    fioletowy: 'purple',
  };

  return (
    <table className='questionnaire-table'>
      <thead>
        <tr>
          <th>Wiek</th>
          <th>Płeć</th>
          <th>Wzrost</th>
          <th>Kolor</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {questionnaires.map((q) => (
          <tr key={q.id}>
            <td>{q.age}</td>
            <td>{q.sex}</td>
            <td>{q.height}</td>
            <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                className='questionnaire-color-box'
                style={{ backgroundColor: colourMap[q.favourite_colour] || 'transparent' }}
              />
              <span>{q.favourite_colour}</span>
            </td>
            <td>
              <button onClick={() => onEdit(q)}>Edytuj</button>
              <button onClick={() => onDelete(q.id)}>Usuń</button>
              <button onClick={() => onView(q)}>Szczegóły</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

QuestionnaireList.propTypes = {
  questionnaires: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};
