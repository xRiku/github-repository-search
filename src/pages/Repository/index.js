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
    state: 'all',
    page: 1,
    nextPageAvailable: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues, nextPageIssues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 10,
          page: 1,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 10,
          page: 2,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      nextPageAvailable: nextPageIssues.data.length !== 0,
    });
  }

  filterIssue = async (state) => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({
      page: 1,
      state,
    });

    const [issues, nextPageIssues] = await Promise.all([
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 10,
          page: 1,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 10,
          page: 2,
        },
      }),
    ]);

    this.setState({
      issues: issues.data,
      nextPageAvailable: nextPageIssues.data.length !== 0,
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
        per_page: 10,
        page: page - 1,
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

    const [issues, nextPageIssues] = await Promise.all([
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 10,
          page: page + 1,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 10,
          page: page + 2,
        },
      }),
    ]);

    this.setState({
      issues: issues.data,
      nextPageAvailable: nextPageIssues.data.length !== 0,
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      page,
      nextPageAvailable,
      state,
    } = this.state;

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
        <Buttons filterState={state}>
          <button
            id="all"
            type="button"
            onClick={() => this.filterIssue('all')}
          >
            Todas
          </button>
          <button
            id="open"
            type="button"
            onClick={() => this.filterIssue('open')}
          >
            Abertas
          </button>
          <button
            id="closed"
            type="button"
            onClick={() => this.filterIssue('closed')}
          >
            Fechadas
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
          {nextPageAvailable ? (
            <button type="button" onClick={this.nextPage}>
              Próxima página
            </button>
          ) : (
            <div />
          )}
        </PageContainer>
      </Container>
    );
  }
}
