const expandComputeNav = () => {
    cy.get("[data-quickstart-id=qs-nav-compute]", { timeout: 120000 }).click({force:true});
  };
  
  const gotoNodeHealthChecks = () => {
    expandComputeNav();
    cy.contains("NodeHealthChecks", { timeout: 120000 }).click({force:true});
  };
  
  const gotoNodeHealthCheckDetails = (name) => {
    expandComputeNav();
    cy.contains("NodeHealthChecks", { timeout: 120000 }).click({force:true});
    cy.contains(name, { timeout: 12000 }).click();
  };
  
  export { expandComputeNav, gotoNodeHealthChecks, gotoNodeHealthCheckDetails };
  