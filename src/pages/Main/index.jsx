import { useCallback, useEffect, useState } from 'react';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Main() {
  const [repoInput, setRepoInput] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Buscar Informações no LocalStorage
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');

    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);
  //

  //Salvar Alterações no LocalStorage
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);
  //

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);

        try {
          if (repoInput === '') {
            throw new Error(
              'Você deve preencher o campo "Adicionar Repositórios"'
            );
          }
          const response = await api.get(`repos/${repoInput}`);

          const hasRepo = repositorios.find((repo) => repo.name === repoInput);

          if (hasRepo) {
            throw new Error('Repositório já existe em sua lista');
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);

          setRepoInput('');
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [repoInput, repositorios]
  );

  function handleInputChange(e) {
    setAlert(null);
    setRepoInput(e.target.value);
  }

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((res) => res.name !== repo);

      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          value={repoInput}
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Adicionar Repositórios"
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={15} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
