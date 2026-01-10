import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import QuestionnaireList from 'components/QuestionnaireList.jsx';
import QuestionnaireDetail from 'components/QuestionnaireDetail.jsx';
import QuestionnaireService from 'services/QuestionnaireService.js';

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

  const handleViewDetails = (q) => setDetailQuestionnaire(q);

  return (
    <div>
      <button style={{ marginBottom: '10px' }} onClick={() => navigate('/new')}>
        Nowa ankieta
      </button>

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
  questionnaires: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      sex: PropTypes.string,
      favourite_colour: PropTypes.string,
    }),
  ).isRequired,
  fetchQuestionnaires: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func.isRequired,
};
