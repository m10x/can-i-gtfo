---
verb: "create"
resource: "validatingwebhookconfigurations"
description: "Create admission webhook configurations that validate resource requests before they are persisted."
abuses:
  - type: "Denial of Service"
    description: "Create validating webhooks that block legitimate resource creation"
    code: |
      # Create webhook that blocks all pod creation
  - type: "Information Disclosure"
    description: "Create validating webhooks that exfiltrate resource information"
    code: |
      # Create webhook that logs all secret operations
  - type: "Persistence"
    description: "Create validating webhooks that ensure persistent access by preventing changes"
    code:
---