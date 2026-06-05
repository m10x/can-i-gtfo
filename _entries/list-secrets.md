---
verb: "list"
resource: "secrets"
description: "List all secrets in Kubernetes namespaces"
abuses:
  - type: "Information Disclosure"
    description: "List cannot only return the name of a resource but also its full details."
    code: |
      # Dump secrets across all namespaces
      kubectl get secrets --all-namespaces -o json

      # Extract values base64 decoded
      jq '{
        secrets: [.items[] |
          {
            name: .metadata.name,
            data: ( .data // {} | with_entries(.value |= @base64d) )
          }
        ]
      }' secrets.json
    references:
      - "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#request-verb-resource"
---