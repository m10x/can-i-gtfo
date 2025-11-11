---
verb: "patch"
resource: "pods"
description: "Modify existing Kubernetes pods"
abuses:
  - type: "Container Escape"
    description: "Patch pods to gain privileged access and escape container boundaries"
    code: |
      # Patch pod to run as privileged
      # Patch pod to add host filesystem mounts      
  - type: "Lateral Movement"
    description: "Patch pod to execute arbitrary code"
---