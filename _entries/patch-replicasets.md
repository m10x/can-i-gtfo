---
verb: "patch"
resource: "replicasets"
description: "Patch existing ReplicaSets"
abuses:
  - type: "Container Escape"
    description: "Patch pods to run with privileged access (BadPod) and escape container boundaries."
    resources:
      - "https://github.com/BishopFox/badPods"
  - type: "Lateral Movement"
    description: "Patch pods to 
    - run with privileged access (BadPod) on a specific node and escape container boundaries.
    - run commands
    - run on an attacker controlled node"
    code: |
      # Use e.g. nodeSelectors or nodeAffinity to deploy to a specific node
    resources:
      - "https://github.com/BishopFox/badPods"
---