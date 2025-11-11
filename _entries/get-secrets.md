---
verb: "get"
resource: "secrets"
description: "View specific secrets in Kubernetes"
abuses:
  - type: "Information Disclosure"
    description: "Access sensitive data stored in secrets including passwords, tokens, and certificates"
    code: |
      # Get specific secret content
      kubectl get secret {secret} -o yaml
---