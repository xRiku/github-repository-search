import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Loading, Owner, IssueList, Buttons, PageContainer } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'open',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  filterIssue = async (state) => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({
      page: 1,
    });

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
        page: 1,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  previousPage = async () => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { state, page } = this.state;

    this.setState({ page: page - 1 });

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  nextPage = async () => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { state, page } = this.state;

    this.setState({ page: page + 1 });

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Buttons>
          <button
            id="open"
            type="button"
            onClick={() => this.filterIssue('open')}
          >
            Open
          </button>
          <button
            id="closed"
            type="button"
            onClick={() => this.filterIssue('closed')}
          >
            Closed
          </button>
          <button
            id="all"
            type="button"
            onClick={() => this.filterIssue('all')}
          >
            All
          </button>
        </Buttons>
        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  <p>{issue.user.login}</p>
                </strong>
              </div>
            </li>
          ))}
        </IssueList>
        <PageContainer>
          {page === 1 ? (
            <div />
          ) : (
            <button type="button" onClick={this.previousPage}>
              Página anterior
            </button>
          )}
          <button type="button" onClick={this.nextPage}>
            Próxima página
          </button>
        </PageContainer>
      </Container>
    );
  }
}
