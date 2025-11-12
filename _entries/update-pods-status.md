---
verb: "update"
resource: "pods/status"
description: "Update the status of pods"
abuses:
  - type: "Information Disclosure"
    description: "Match a pod's label with another pod's label to receive network traffic intended for that pod."
  - type: "Lateral Movement"
    description: "Update a pod's scheduling constraints, such as nodeAffinity and nodeSelectors, so that it will be scheduled on an attacker-controlled node."
---