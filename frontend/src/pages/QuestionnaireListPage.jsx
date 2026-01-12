import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import QuestionnaireService from '../services/QuestionnaireService.js';
import QuestionnaireList from 'components/QuestionnaireList.jsx';
import QuestionnaireDetail from 'components/QuestionnaireDetail.jsx';

export default function QuestionnaireListPage({
  questionnaires,
  fetchQuestionnaires,
  setGlobalError,
}) {
  const [detailQuestionnaire, setDetailQuestionnaire] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę ankietę?')) return;
    try {
      await QuestionnaireService.delete(id);
      if (detailQuestionnaire?.id === id) setDetailQuestionnaire(null);
      fetchQuestionnaires();
    } catch {
      setGlobalError('Nie udało się usunąć ankiety');
    }
  };

  const handleViewDetails = (q) => {
    const updated = questionnaires.find((item) => item.id === q.id);
    setDetailQuestionnaire(updated || q);
  };

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
        onEdit={(q) => navigate(`/edit/${q.id}`)}
        onDelete={handleDelete}
        onView={handleViewDetails}
      />

      {detailQuestionnaire && (
        <QuestionnaireDetail
          questionnaire={detailQuestionnaire}
          onClose={() => setDetailQuestionnaire(null)}
        />
      )}
    </div>
  );
}

QuestionnaireListPage.propTypes = {
  questionnaires: PropTypes.array.isRequired,
  fetchQuestionnaires: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func.isRequired,
};
