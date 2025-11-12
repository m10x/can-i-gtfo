---
verb: "patch"
resource: "pods"
description: "Modify existing Kubernetes pods"
abuses:
  - type: "Container Escape"
    description: "Patch pods to run with privileged access (BadPod) and escape container boundaries"
    code: |
      # Patch pod to run as privileged
      # Patch pod to add host filesystem mounts
    resources:
      - "https://github.com/BishopFox/badPods"
  - type: "Lateral Movement"
    description: "Patch pods to 
    1. execute arbitrary code
    2. change its labels to trigger its eviction until it is assigned to an attacker controlled node (Can be combined with the abuse of 'update/patch nodes' or 'update/patch ' permissions to prevent pods being assigned to non-attacker controlled nodes)"
---