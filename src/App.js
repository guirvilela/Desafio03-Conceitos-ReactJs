import React, { useState, useEffect } from 'react';

import './styles.css';
import axios from './services/api';

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    handleGetRepository();
  }, []);
  async function handleGetRepository() {
    const res = await axios.get('repositories');
    setRepository(res.data);
  }

  async function handleAddRepository() {
    const data = await axios.post('/repositories', {
      title: 'Conceitos com React',
      url: 'www.google.com.br',
      techs: ['ReactJs', 'NodeJs'],
    });
    setRepository([...repository, data.data]);
  }

  async function handleRemoveRepository(id, index) {
    const allRep = [...repository];

    await axios.delete(`/repositories/${id}`);

    allRep.splice(index, 1);
    setRepository(allRep);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((rep, index) => {
          return (
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id, index)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
