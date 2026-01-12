import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import QuestionnaireService from 'services/QuestionnaireService.js';
import QuestionnaireList from 'components/QuestionnaireList.jsx';
import QuestionnaireDetail from 'components/QuestionnaireDetail.jsx';
import ErrorPopup from 'components/errorPopup/ErrorPopup.jsx';

export default function QuestionnaireListPage({
  questionnaires,
  fetchQuestionnaires,
  setGlobalError,
}) {
  const [detailQuestionnaire, setDetailQuestionnaire] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę ankietę?')) return;
    try {
      await QuestionnaireService.delete(id);
      if (detailQuestionnaire?.id === id) setDetailQuestionnaire(null);
      await fetchQuestionnaires();
    } catch (err) {
      if (err.response?.status === 404) {
        setGlobalError('Ankieta została usunięta');
        await fetchQuestionnaires();
        navigate('/');
      } else {
        setErrorMessage('Nie udało się usunąć ankiety');
      }
    }
  };

  const handleViewDetails = async (q) => {
    try {
      await fetchQuestionnaires();

      const response = await QuestionnaireService.get(q.id);
      setDetailQuestionnaire(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setGlobalError('Ankieta została usunięta');
        await fetchQuestionnaires();
        navigate('/');
      } else {
        setErrorMessage('Nie udało się pobrać szczegółów ankiety');
      }
    }
  };

  const handleEdit = (q) => navigate(`/edit/${q.id}`);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => navigate('/new')} style={{ marginRight: '10px' }}>
          Nowa ankieta
        </button>
        <button onClick={fetchQuestionnaires}>Odśwież listę</button>
      </div>

      <QuestionnaireList
        questionnaires={questionnaires}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleViewDetails}
      />

      {detailQuestionnaire && (
        <QuestionnaireDetail
          questionnaire={detailQuestionnaire}
          onClose={() => setDetailQuestionnaire(null)}
          setGlobalError={setGlobalError}
        />
      )}

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />
    </div>
  );
}

QuestionnaireListPage.propTypes = {
  questionnaires: PropTypes.array.isRequired,
  fetchQuestionnaires: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func.isRequired,
};
