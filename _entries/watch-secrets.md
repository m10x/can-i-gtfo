---
verb: "watch"
resource: "secrets"
description: "Monitor changes to secrets"
abuses:
  - type: "Information Disclosure"
    description: "Watch secrets and see all changes."
    code: |
      # Watch secrets across all namespaces
      kubectl get secrets --all-namespaces -o yaml -w
    references:
      - "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#request-verb-resource"
---