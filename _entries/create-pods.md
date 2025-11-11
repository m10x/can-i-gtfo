---
verb: "create"
resource: "pods"
description: "Create new pods"
abuses:
  - type: "Container Escape"
    description: "Create a pod with privileged access and escape container boundaries."
    resources:
      - "https://github.com/BishopFox/badPods"
  - type: "Lateral Movement"
    description: "Create a pod with privileged access on a specific node using 'nodeSelector' and escape container boundaries."
    resources:
      - "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector"
      - "https://github.com/BishopFox/badPods"
---