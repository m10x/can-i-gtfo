---
verb: "create"
resource: "mutatingwebhookconfigurations"
description: "Create admission webhook configurations that mutate resource requests before they are persisted."
abuses:
  - type: "Privilege Escalation"
    description: "Create mutating webhooks to automatically escalate privileges of created resources"
    code: |
      # Create webhook that adds privileged security context to all pods

      # Create webhook that adds cluster-admin role to all service accounts
---