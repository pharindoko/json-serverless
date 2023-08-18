describe('My First Test', () => {
  it('Open Swagger ui', () => {
    cy.visit('/ui');
  });

  it('Open Graphql Interface', () => {
    cy.visit('/graphql');
  });
});
