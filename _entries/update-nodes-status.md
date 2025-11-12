---
verb: "update"
resource: "nodes/status"
description: "Update the status of nodes"
abuses:
  - type: "Lateral Movement"
    description: "Modify a node so that all its pods are evicted or no new pods are assigned to it. Repeat with other nodes until the pods are assigned to an attacker controlled node."
    code: |
      # Set NoExecute taint
      ## This will evict all pods (some pods may tolerate it. In this case use the PodCapacity technique)
      # Set PodCapacity=0
      ## This leads to no new pods being assigned to the node. Wait or delete the running pods with one of the following permissions:
      ### update/patch pods
      ### delete pods
      ### create pods/eviction
---