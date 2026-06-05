---
verb: "delete"
resource: "secrets"
description: "Delete specific secrets in Kubernetes"
abuses:
  - type: "Denial of Service"
    description: "Delete secrets used by pods etc."
    code: |
      # Delete specific secret
      kubectl delete secret {secret-name}
---