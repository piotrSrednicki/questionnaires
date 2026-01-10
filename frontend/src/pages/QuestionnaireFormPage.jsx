import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionnaireService from 'services/QuestionnaireService.js';
import QuestionnaireForm from 'components/QuestionnaireForm.jsx';

export default function QuestionnaireFormPage({ onSubmitSuccess, questionnaires, setGlobalError }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '',
    height: '',
    sex: '',
    favourite_colour: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (id) {
      const q = questionnaires?.find((q) => q.id.toString() === id);
      if (!q) {
        setGlobalError('Ankieta została usunięta');
        navigate('/');
        return;
      }

      let sexValue = '';
      if (q.sex === 'M' || q.sex === 'K') sexValue = q.sex;
      else if (q.sex?.toLowerCase() === 'mężczyzna') sexValue = 'M';
      else if (q.sex?.toLowerCase() === 'kobieta') sexValue = 'K';

      setFormData({
        age: q.age || '',
        height: q.height || '',
        sex: sexValue,
        favourite_colour: q.favourite_colour || '',
      });
    }
  }, [id, questionnaires, navigate, setGlobalError]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const randomColour = async () => {
    try {
      const response = await QuestionnaireService.getRandomColour();
      setFormData((prev) => ({ ...prev, favourite_colour: response.data.favourite_colour }));
    } catch {
      setError('Nie udało się pobrać losowego koloru');
    }
  };

  const validate = () => {
    if (!formData.age || formData.age < 16 || formData.age > 150)
      return 'Wiek musi być w zakresie 16–150';
    if (!formData.height || formData.height < 50 || formData.height > 280)
      return 'Wzrost musi być w zakresie 50–280 cm';
    if (!formData.sex || (formData.sex !== 'M' && formData.sex !== 'K'))
      return 'Płeć jest wymagana';
    if (!formData.favourite_colour) return 'Najpierw wylosuj ulubiony kolor';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    setError(null);
    setSuccess(false);

    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      if (id) {
        await QuestionnaireService.update(id, formData);
      } else {
        await QuestionnaireService.create(formData);
      }
      setSuccess(true);
      onSubmitSuccess();
      navigate('/');
    } catch (err) {
      if (err.response?.status === 404) {
        setGlobalError('Ankieta została usunięta');
        navigate('/');
      } else {
        setError('Błąd podczas zapisu ankiety');
      }
    }
  };

  return (
    <QuestionnaireForm
      formData={formData}
      onChange={handleChange}
      onRandomColour={randomColour}
      onSubmit={handleSubmit}
      error={error}
      success={success}
      editing={!!id}
      disabledSave={!formData.favourite_colour || !formData.sex}
      attemptedSubmit={attemptedSubmit}
    />
  );
}

QuestionnaireFormPage.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  questionnaires: PropTypes.array.isRequired,
  setGlobalError: PropTypes.func.isRequired,
};
