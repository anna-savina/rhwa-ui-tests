/// <reference types="cypress" />

import {
    randomReadyTestNodeByRole,
} from "../support/constants"

export function login() {
    cy.visit('/')
    cy.contains('admin').click()
    cy.get('#inputUsername').type('kubeadmin')
    cy.get('#inputPassword').type('obnGL-Gzo68-HphJI-guWso{enter}')
}

export function click_button(data_test_value, button_text) {
    cy.get(`button[data-test=${data_test_value}]`)
      .should('be.visible')
      .should('contain', button_text)
      .click()
}

export function go_to_menu_tab(menu_tab_name) {
    cy.contains(menu_tab_name).click({force:true})
}

export function select_item(item_name) {
    cy.get('body')
      .should('contain', item_name)
      .contains(item_name)
      .click()
}

export function check_status_succeed() {
    cy.get('[data-test=status-text]')
      .should('contain', 'Succeeded')
}

export function go_to_horizontal_sub_menu(sub_menu_name) {
    cy.get('.co-m-horizontal-nav__menu')
      .should('contain', sub_menu_name)
      .contains(sub_menu_name)
      .click()
}

export function select_view(view) {
    cy.get('.co-radio-group')
      .should('contain', `${view} view`)
    cy.get(`[data-test="${view} view-radio-input"]`)
      .check()
      .should('be.checked')
}

export function  create_nmo_form_view() {
    cy.get('#root_spec_nodeName')
      .clear()
      .type(randomReadyTestNodeByRole)
    // to fill all fields
    click_button("create-dynamic-form","Create")
}

export const selectFromDropdown = (dropdownToggleSelector, itemLabel) => {
  cy.get(dropdownToggleSelector).click();
  cy.get("[role=menuitem]").contains(itemLabel).click();
};

export const closePopover = () => {
  cy.get("[aria-label=Close]").click();
};
