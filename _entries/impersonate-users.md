---
verb: "impersonate"
resource: "users"
description: "Impersonate other users in the Kubernetes cluster"
abuses:
  - type: "Privilege Escalation"
    description: "Assume the identity of privileged users to bypass access controls"
    code: |
      # Impersonate cluster administrator
      kubectl --as={admin-user} get secrets --all-namespaces
---