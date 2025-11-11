---
verb: "escalate"
resource: "roles"
description: "Escalate permissions on Kubernetes roles"
abuses:
  - type: "Privilege Escalation"
    description: "Use the escalate verb to bypass RBAC restrictions and grant higher privileges"
    code: |
      # Escalate role to have permissions the current user doesn't have
      kubectl edit role {role}
---