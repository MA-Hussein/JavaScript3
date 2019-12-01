'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
       this.container.innerHTML = '';
       createAndAppend('h3',this.container,{text:'Contributions'})
       const ContributorsList = createAndAppend('ul', this.container, {class: 'contributors-list'});
       contributors.forEach(contributor => {
       const contributorInfo = createAndAppend('li', ContributorsList,{class:'contributor'})
       createAndAppend('img', contributorInfo, { src: contributor.avatar_url})
       createAndAppend('a', contributorInfo, { text: contributor.login, href: contributor.html_url ,target:"_blank"})
       createAndAppend('p', contributorInfo, { text: contributor.contributions , class: 'sub-contributors'})
      });
    }
  }

  window.ContributorsView = ContributorsView;
}
