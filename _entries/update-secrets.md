---
verb: "update"
resource: "secrets"
description: "Edit specific secrets in Kubernetes"
abuses:
  - type: "Denial of Service"
    description: "Change the content of secrets used by pods etc. to nonsense."
    code: |
      # Change secret's content
      kubectl edit secrets {secret}
---