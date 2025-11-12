---
verb: "create"
resource: "replicasets"
description: "Create ReplicaSets"
abuses:
  - type: "Container Escape"
    description: "Deploy a pod with privileged access (BadPod) and escape container boundaries."
    resources:
      - "https://github.com/BishopFox/badPods"
      
  - type: "Lateral Movement"
    description: "Deploy a pod with privileged access (BadPod) on a specific node and escape container boundaries."
    code: |
      # Use e.g. nodeSelectors or nodeAffinity to deploy to a specific node
    resources:
      - "https://github.com/BishopFox/badPods"
---