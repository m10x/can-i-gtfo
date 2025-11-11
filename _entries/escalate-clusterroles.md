---
verb: "escalate"
resource: "clusterroles"
description: "Escalate permissions on Kubernetes cluster roles"
abuses:
  - type: "Privilege Escalation"
    description: "Use the escalate verb to bypass RBAC restrictions and grant cluster-wide higher privileges"
    code: |
      # Escalate cluster role to have cluster-wide permissions the current user doesn't have
      kubectl edit clusterrole {role}
---