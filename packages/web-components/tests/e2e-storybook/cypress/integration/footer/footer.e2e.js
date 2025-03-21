/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-footer--default';

/**
 * Sets the correct path (Default language only)
 *
 * @type {string}
 * @private
 */
const _pathDefaultLanguageOnly =
  '/iframe.html?id=components-footer--default-language-only';

describe('c4d-footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="c4d--footer-logo"]').then(($link) => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get('[data-autoid="c4d--locale-btn"]');
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get('[data-autoid="c4d--locale-btn"]');
    localeButton.click();

    cy.get('c4d-region-item[name="Americas"]').click();

    cy.get('c4d-locale-item[region="Americas"]').should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get('[data-autoid="c4d--locale-btn"]');
    localeButton.click();

    cy.get('[name="Americas"]').click();

    cy.get('c4d-locale-search').shadow().find('.cds--search-input').type('ca', {
      force: true,
    });

    cy.get('c4d-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should load clickable footer links', () => {
    cy.get('c4d-footer-nav-group')
      .find('c4d-footer-nav-item')
      .each(($link) => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should load clickable legal links', () => {
    cy.get('c4d-legal-nav')
      .find('c4d-legal-nav-item')
      .each(($link) => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('c4d-footer | Default language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it.skip('should load language selector dropdown and be interactive', () => {
    cy.get('c4d-language-selector-desktop').should('have.length', 1);

    // FIXME: Firefox is not providing the space above for this test to pass
    if (Cypress.browser.name !== 'firefox') {
      cy.get('c4d-language-selector-desktop')
        .shadow()
        .find('div.cds--dropdown')
        .click();
      cy.get('c4d-language-selector-desktop')
        .find('c4d-combo-box-item[value="Arabic / عربية"]')
        .click();
      cy.get('c4d-language-selector-desktop').should(
        'have.value',
        'Arabic / عربية'
      );
    }

    cy.takeSnapshots();
  });
});

describe('c4d-footer | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="c4d--footer-logo"]').then(($link) => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get('[data-autoid="c4d--locale-btn"]');
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get('[data-autoid="c4d--locale-btn"]');
    localeButton.click();

    cy.get('c4d-region-item[name="Americas"]').click();

    cy.get('c4d-locale-item[region="Americas"]').should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get('[data-autoid="c4d--locale-btn"]');
    localeButton.click();

    cy.get('[name="Americas"]').click();

    cy.get('c4d-locale-search').shadow().find('.cds--search-input').type('ca', {
      force: true,
    });

    cy.get('c4d-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should load clickable footer links', () => {
    cy.get('c4d-footer-nav-group')
      .find('c4d-footer-nav-item')
      .each(($link) => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });

  it('should load clickable legal links', () => {
    cy.get('c4d-legal-nav')
      .find('c4d-legal-nav-item')
      .each(($link) => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('c4d-footer | Default language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('c4d-language-selector-mobile').should('have.length', 1);
    cy.get('c4d-language-selector-mobile')
      .shadow()
      .find('select.cds--select-input')
      .select('Arabic / عربية');
    cy.get('c4d-language-selector-mobile')
      .shadow()
      .find('select.cds--select-input')
      .should('have.value', 'Arabic / عربية');

    cy.takeSnapshots('mobile');
  });
});
