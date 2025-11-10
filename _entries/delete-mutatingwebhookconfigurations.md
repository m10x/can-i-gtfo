---
verb: "delete"
resource: "mutatingwebhookconfigurations"
description: "Delete admission webhook configurations that mutate resource requests before they are persisted.
abuses:
  - type: "Privilege Escalation"
    description: "Delete mutating webhook configurations that enforce security policies to bypass restrictions"
    code: |
      # Delete security policy enforcement webhook
      
  - type: "Container Escape"
    description: "Delete mutating webhook configurations that prevent container escape techniques"
    code: |
      # Delete container hardening webhook
      
  - type: "Lateral Movement"
    description: "Delete mutating webhook configurations that enforce network and access policies"
    code: |
      # Delete network policy enforcement webhook
      
---