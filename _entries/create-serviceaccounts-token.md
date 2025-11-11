---
verb: "create"
resource: "serviceaccounts/token"
description: "Create an authentication token for a service account"
abuses:
  - type: "Privilege Escalation"
    description: "Create a token for a privileged service account"
---