---
verb: "update"
resource: "pods"
description: "Update existing Kubernetes pods"
abuses:
  - type: "Container Escape"
    description: "Update pod to run with privileged access (BadPod) and escape container boundaries"
    code: |
      # Update pod to run as privileged
      # Update pod to add host filesystem mounts
    resources:
      - "https://github.com/BishopFox/badPods"
  - type: "Lateral Movement"
    description: "Update pod to
    1. execute arbitrary code
    2. change its labels to trigger its eviction until it is assigned to an attacker controlled node (Can be combined with the abuse of 'update/patch nodes' or 'update/patch nodes/status' permissions to prevent pods being assigned to non-attacker controlled nodes)"
---