/// <reference types="cypress" />

export const readyNodesListByRole = (nodesList) => {
    cy.log(`Getting list of 'Ready' worker node objects from ${nodesUri} table`)
    let re = new RegExp(role + ".*")
    var nodeObjList = []
    cy.get('[data-test-rows="resource-row"]').each(($nodeTableRow, $index) => {
        var nodeRowValues = $nodeTableRow.text().split(nodesRegex)
        var obj = {
        nodeName: nodeRowValues[2],
        nodeStatus: nodeRowValues[3],
        index: $index
        }
        if (obj.nodeName.match(re) && obj.nodeStatus == readyStatusText) {
            nodeObjList.push(obj)
            }
        })
    return nodesList
}

export const randomReadyTestNodeByRole = (nodeName) => {
    cy.wrap(readyNodesListByRole).then(($nodeObjList) => {
        cy.wrap($nodeObjList[Math.floor(Math.random() * $nodeObjList.length)]).as("nodeName")
    })
    return nodeName
}

export const defaultNHCData = {
    name: "nhc-worker-default",
    remediator: "Self node remediation",
    nodeSelector:
      "!node-role.kubernetes.io/control-plane, !node-role.kubernetes.io/master",
    minHealthy: "51%",
    observedNodes: 3,
    HealthyNodes: 3,
    status: "Enabled",
  };
  
  export const clicableDefaultNHCFields = [
    "Name",
    "Labels",
    "Annotations",
    "Node selector",
    "Created at",
    "Owner",
    "Min healthy",
    "Enabled",
  ];
  export const notClickableDefaultNHCFields = [
    "Remediator",
    "Observed nodes",
    "Healthy nodes",
    "Status",
  ];

