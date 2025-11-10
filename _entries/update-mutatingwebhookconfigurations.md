---
verb: "update"
resource: "mutatingwebhookconfigurations"
description: "Update admission webhook configurations that mutate resource requests before they are persisted."
abuses:
  - type: "Privilege Escalation"
    description: "Update mutating webhooks to automatically escalate privileges of created resources"
    code: |
      # Update webhook to add privileged security context to all pods

      # Update webhook to add cluster-admin role to all service accounts
---