'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    
    render(repo) {
      const repoContainer =  document.querySelector('.repo-container');
      repoContainer.innerHTML = ' '
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
  }


  window.RepoView = RepoView;
}