---
verb: "delete"
resource: "nodes"
description: "Delete a node"
abuses:
  - type: "Lateral Movement"
    description: "Delete a node, which will result in the removal of all pods that are currently assigned to it. This process can be repeated until the pods are assigned to an attacker controlled node.
    This can be combined with the abuse of 'update/patch nodes' or 'update/patch nodes/status' permissions to prevent pods being assigned to non-attacker controlled nodes.
---