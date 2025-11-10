---
verb: "update"
resource: "validatingwebhookconfigurations"
description: "Update admission webhook configurations that validate resource requests before they are persisted."
abuses:
  - type: "Persistence"
    description: "Update validating webhook configurations to ensure persistent access by preventing changes"
    code:
  - type: "Information Disclosure"
    description: "Update validating webhook configurations to log information"
    code: |
      # Update webhook to log all secret operations
  - type: "Denial of Service"
    description: "Update validating webhook configurations to disrupt cluster operations"
    code: |      
      # Update webhook to reject all pod creations
---