---
verb: "patch"
resource: "validatingwebhookconfigurations"
description: "Patch admission webhook configurations that validate resource requests before they are persisted."
abuses:
  - type: "Persistence"
    description: "Patch validating webhook configurations to ensure persistent access by preventing changes"
  - type: "Information Disclosure"
    description: "Patch validating webhook configurations to log information"
    code: |
      # Patch webhook to log all secret operations
  - type: "Denial of Service"
    description: "Patch validating webhook configurations to disrupt cluster operations"
    code: |
      # Patch webhook to reject all pod creations
---