---
verb: "create"
resource: "pods/eviction"
description: "Evict a pod from a node"
abuses:
  - type: "Lateral Movement"
    description: "Evict pods from nodes until they are assigned to an attacker controlled node. Can be combined with the abuse of 'update/patch nodes' or 'update/patch nodes/status' permissions to prevent pods being assigned to non-attacker controlled nodes.
---