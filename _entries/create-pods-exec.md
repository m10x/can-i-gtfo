---
verb: "create"
resource: "pods/exec"
description: "Create exec sessions in running pods"
abuses:
  - type: "Lateral Movement"
    description: "Use exec to run commands on the pod e.g. to get its service account token"
    code: |
      # Access service account tokens for lateral movement
      kubectl exec -it target-pod -- cat /var/run/secrets/kubernetes.io/serviceaccount/token
  - type: "Denial of Service"
    description: "Use exec to disrupt services and consume resources"
---