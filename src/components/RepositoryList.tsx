import React, { useEffect, useState } from 'react';
import { RepositroryItem } from './RepositroryItem';

import '../styles/repositories.scss';

interface Repositrory {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repositrory[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/12Mlima/repos')
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositorios</h1>
      <ul>
        {repositories.map((repository) => (
          <RepositroryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
