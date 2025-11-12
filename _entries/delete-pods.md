---
verb: "delete"
resource: "pods"
description: "Delete a pod"
abuses:
  - type: "Lateral Movement"
    description: "Delete pods they are assigned to an attacker controlled node. Can be combined with the abuse of 'update/patch nodes' or 'update/patch nodes/status' permissions to prevent pods being assigned to non-attacker controlled nodes.
---