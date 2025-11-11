---
verb: "patch"
resource: "configmaps"
description: "Patch configmaps"
abuses:
  - type: "Privilege Escalation"
    description: "Patch aws-auth configmap on EKS clusters to gain cluster admin privileges"
---