'use strict';

{
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

function fetchJSON(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw Error(`HTTP error ${response.status} - ${response.statusText}`);
      }
      return response.json();
    });
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderError(error) {
    const root = document.getElementById('root');
    root.innerHTML = '';
    createAndAppend('h1', root, { text: error.message, class: `alert-error` });
  }

 function renderRepos(repo,repoContainer) {

      repoContainer.innerHTML = ' ';
      const dateAndTime = new Date(repo.updated_at);
      const selectedRepo = createAndAppend('ul',repoContainer);
	  const repoDetails = createAndAppend('li', selectedRepo);
	  createAndAppend('span', repoDetails, { text: `Repository Name : ` });
      createAndAppend('a',repoDetails,{text:repo.name, href: repo.html_url})
      createAndAppend('p', repoDetails, { text: `Fork :  ${repo.forks_count}` });
      createAndAppend('p', repoDetails, { text: `Login :  ${repo.owner.login}` });
      createAndAppend('p', repoDetails, { text: `Description :   ${repo.description}` });
      createAndAppend('p', repoDetails, { text: `Updated : ${dateAndTime.toLocaleString('en-US')}` });
    }

  function renderContributions(repo, ul) {
    fetchJSON(repo.contributors_url)
      .then(contributors => {
        ul.innerHTML = '';
        createAndAppend('li', ul, { text: `Contributors:` });
        contributors.forEach(contributor => {
      const contributorInfo = createAndAppend('li', ul,{class:'contributor'})
       createAndAppend('img', contributorInfo, { src: contributor.avatar_url})
       createAndAppend('a', contributorInfo, { text: contributor.login, href: contributor.html_url ,target:"_blank"})
       createAndAppend('p', contributorInfo, { text: contributor.contributions , class: 'sub-contributors'})
      });
      })
      .catch(error => renderError(error));
  }

  function createOptionElements(repositories, select) {
    repositories
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((repo, index) => {
        createAndAppend('option', select, { text: repo.name, value: index });
      });
  }

  function main(url) {
    const root = document.getElementById('root');
    const header = createAndAppend('header', root);
    createAndAppend('h1', header, { text: 'HYF Repositories' });
    const select = createAndAppend('select', header);
    const mainContainer = createAndAppend('div', root, { id: `main-container` });
    const repoContainer = createAndAppend('section', mainContainer, { id: 'repo-container' });
    const contributorsContainer = createAndAppend('section', mainContainer, { id: 'contributors-container' });
    const ul = createAndAppend('ul', contributorsContainer, { id: 'contributors-list' });
 
    fetchJSON(url)
      .then(repositories => {
        createOptionElements(repositories, select);

        renderRepos(repositories[0], repoContainer);
        renderContributions(repositories[0], ul);

        select.addEventListener('change', () => {
          const repo = repositories[select.value];
          renderRepos(repo, repoContainer);
          renderContributions(repo, ul);
        });
      })
      .catch(error => renderError(error));
  }

  window.onload = () => {
    main(HYF_REPOS_URL);
  };
}
