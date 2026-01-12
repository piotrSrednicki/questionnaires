import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionnaireService from 'services/QuestionnaireService.js';
import QuestionnaireListPage from 'pages/QuestionnaireListPage.jsx';
import QuestionnaireFormPage from 'pages/QuestionnaireFormPage.jsx';
import ErrorPopup from 'components/errorPopup/ErrorPopup.jsx';

export default function App() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [globalError, setGlobalError] = useState(null);

  const fetchQuestionnaires = async () => {
    try {
      const response = await QuestionnaireService.list();
      const data = Array.isArray(response.data) ? response.data : response.data.results || [];
      setQuestionnaires(data);
    } catch {
      setGlobalError('Nie udało się pobrać listy ankiet');
    }
  };

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const handleSubmitSuccess = () => {
    fetchQuestionnaires();
  };

  return (
    <Router>
      <div className='app-container'>
        <h1>Ankiety</h1>
        <ErrorPopup message={globalError} onClose={() => setGlobalError(null)} />

        <Routes>
          <Route
            path='/'
            element={
              <QuestionnaireListPage
                questionnaires={questionnaires}
                fetchQuestionnaires={fetchQuestionnaires}
                setGlobalError={setGlobalError}
              />
            }
          />

          <Route
            path='/new'
            element={
              <QuestionnaireFormPage
                onSubmitSuccess={handleSubmitSuccess}
                setGlobalError={setGlobalError}
                fetchQuestionnaires={fetchQuestionnaires}
              />
            }
          />

          <Route
            path='/edit/:id'
            element={
              <QuestionnaireFormPage
                onSubmitSuccess={handleSubmitSuccess}
                setGlobalError={setGlobalError}
                fetchQuestionnaires={fetchQuestionnaires}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
