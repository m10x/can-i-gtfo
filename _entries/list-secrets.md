---
verb: "list"
resource: "secrets"
description: "List all secrets in Kubernetes namespaces"
abuses:
  - type: "Information Disclosure"
    description: "List cannot only return the name of a resource but also its full details."
    code: |
      # List secrets across all namespaces
      kubectl get secrets --all-namespaces -o json
    references:
      - "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#request-verb-resource"
---