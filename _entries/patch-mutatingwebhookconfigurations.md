---
verb: "patch"
resource: "mutatingwebhookconfigurations"
description: "Patch admission webhook configurations that mutate resource requests before they are persisted."
abuses:
  - type: "Privilege Escalation"
    description: "Patch mutating webhooks to automatically escalate privileges of created resources"
    code: |
      # Patch webhook to add privileged security context to all pods

      # Patch webhook to add cluster-admin role to all service accounts
---