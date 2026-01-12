import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionnaireService from 'services/QuestionnaireService.js';
import QuestionnaireForm from 'components/QuestionnaireForm.jsx';
import ErrorPopup from 'components/errorPopup/ErrorPopup.jsx';

export default function QuestionnaireFormPage({
  onSubmitSuccess,
  setGlobalError,
  fetchQuestionnaires,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '',
    height: '',
    sex: '',
    favourite_colour: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchQuestionnaire = async () => {
      try {
        const response = await QuestionnaireService.get(id);
        if (!isMounted) return;

        const q = response.data;

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
      } catch (err) {
        if (err.response?.status === 404) {
          setGlobalError('Ankieta już nie istnieje');
          navigate('/');
        } else {
          setErrorMessage('Nie udało się pobrać danych ankiety');
        }
      }
    };

    fetchQuestionnaire();

    return () => {
      isMounted = false;
    };
  }, [id, navigate, setGlobalError]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const randomColour = async () => {
    try {
      const response = await QuestionnaireService.getRandomColour();
      setFormData((prev) => ({ ...prev, favourite_colour: response.data.favourite_colour }));
    } catch {
      setErrorMessage('Nie udało się pobrać losowego koloru');
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
    setErrorMessage(null);

    const validationError = validate();
    if (validationError) return setErrorMessage(validationError);

    try {
      if (id) {
        await QuestionnaireService.update(id, formData);
      } else {
        await QuestionnaireService.create(formData);
      }

      if (onSubmitSuccess) await onSubmitSuccess();

      navigate('/');
    } catch (err) {
      if (err.response?.status === 404) {
        setGlobalError('Ankieta już nie istnieje');
        await fetchQuestionnaires();
        navigate('/');
      } else {
        setErrorMessage('Błąd podczas zapisu ankiety');
      }
    }
  };

  return (
    <>
      <QuestionnaireForm
        formData={formData}
        onChange={handleChange}
        onRandomColour={randomColour}
        onSubmit={handleSubmit}
        onCancel={async () => {
          await fetchQuestionnaires();
          navigate('/');
        }}
        editing={!!id}
        disabledSave={!formData.favourite_colour || !formData.sex}
      />
      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />
    </>
  );
}

QuestionnaireFormPage.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func.isRequired,
  fetchQuestionnaires: PropTypes.func.isRequired,
};
