import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionnaireForm({
  formData,
  onChange,
  onRandomColour,
  onSubmit,
  onCancel,
  editing,
  disabledSave,
}) {
  return (
    <form className='questionnaire-form' onSubmit={onSubmit}>
      <h2>{editing ? 'Edytuj ankietę' : 'Nowa ankieta'}</h2>

      <label>
        Wiek:
        <input type='number' name='age' value={formData.age} onChange={onChange} required />
      </label>

      <label>
        Wzrost (cm):
        <input type='number' name='height' value={formData.height} onChange={onChange} required />
      </label>

      <label>
        Płeć:
        <select name='sex' value={formData.sex} onChange={onChange} required>
          <option value=''>-- wybierz --</option>
          <option value='M'>Mężczyzna</option>
          <option value='K'>Kobieta</option>
        </select>
      </label>

      <p>
        Ulubiony kolor:{' '}
        <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
          {formData.favourite_colour || '–'}
        </span>
      </p>
      <button type='button' onClick={onRandomColour}>
        Losuj kolor
      </button>

      <button type='submit' disabled={disabledSave}>
        {editing ? 'Zaktualizuj ankietę' : 'Zapisz ankietę'}
      </button>

      <button type='button' style={{ marginLeft: '10px' }} onClick={onCancel}>
        Anuluj
      </button>
    </form>
  );
}

QuestionnaireForm.propTypes = {
  formData: PropTypes.shape({
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sex: PropTypes.string,
    favourite_colour: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onRandomColour: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  success: PropTypes.bool,
  editing: PropTypes.bool,
  disabledSave: PropTypes.bool,
  attemptedSubmit: PropTypes.bool,
};
