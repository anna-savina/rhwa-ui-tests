import { selectFromDropdown } from "../../support/actions";

const typeSelector = "[data-test=toggle-Type-dropdown]";
const statusSelector = "[data-test=toggle-Status-dropdown]";
const durationSelector = "[data-test=duration-input]";
const addMoreSelector = "[data-test=add-unhealthy-condition]";
const removeSelector = "[data-test=remove-unhealthy-condition]";
const itemSelector = "[data-test=unhealthy-condition]";

const getItemSelector = (idx) => {
  return `${itemSelector}[data-index=${idx}]`;
};

const getTypeSelector = (idx) => {
  return `${getItemSelector(idx)} ${typeSelector}`;
};

const getStatusSelector = (idx) => {
  return `${getItemSelector(idx)} ${statusSelector}`;
};

const getDurationSelector = (idx) => {
  return `${getItemSelector(idx)} ${durationSelector}`;
};

const validateUnhealthyCondition = (idx, condition) => {
  cy.get(getTypeSelector(idx)).should("contain", condition.type);
  if (condition.status) {
    cy.get(getStatusSelector(idx)).should("contain", condition.status);
  }
  cy.get(getDurationSelector(idx)).should("have.value", condition.duration);
};

const validateUnhealthyConditions = (conditions) => {
  for (let i = 0; i < conditions.length; ++i) {
    validateUnhealthyCondition(i, conditions[i]);
  }
};

const setType = (idx, type) => {
  selectFromDropdown(getTypeSelector(idx), type);
};

const setStatus = (idx, status) => {
  selectFromDropdown(getStatusSelector(idx), status);
};

const setDuration = (idx, durationg) => {
  cy.get(getDurationSelector(idx)).type(duration);
};

const clickAddUnhealthyCondition = () => {
  cy.get(addMoreSelector).click();
};

const setCustomType = (idx, type) => {
  setType(idx, "Use custom type");
  cy.get("[data-test=custom-type-input]").type(type);
  cy.get("[data-test=confirm-custom-type]").click();
};

const addUnhealthyCondition = () => {
  clickAddUnhealthyCondition();
};

const validateNumUnhealthyConditions = (num) => {
  cy.get(itemSelector).should("have.length", num);
};

const setUnhealthyCondition = (idx, condition) => {
  if (condition.isCustomType) {
    setCustomType(idx, condition.type);
  } else {
    setType(idx, condition.type);
  }
  if (condition.status) {
    setStatus(idx, condition.status);
  }
  setDuration(idx, condition.duration);
};

const removeUnhealthyCondition = () => {
  cy.get(removeSelector).click();
};

const validateStatusDisabled = (idx) => {
  cy.get(getStatusSelector(idx)).should("be.disabled");
};

export const defaultConditions = [
  {
    duration: "300s",
    type: "Ready",
    status: "False",
  },
  {
    duration: "300s",
    type: "Ready",
    status: "Unknown",
  },
];

export {
  removeUnhealthyCondition,
  setUnhealthyCondition,
  validateNumUnhealthyConditions,
  addUnhealthyCondition,
  setDuration,
  setStatus,
  setType,
  validateUnhealthyConditions,
  clickAddUnhealthyCondition,
  validateStatusDisabled,
};
