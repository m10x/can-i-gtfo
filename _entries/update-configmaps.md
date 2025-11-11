---
verb: "update"
resource: "configmaps"
description: "Update configmaps"
abuses:
  - type: "Privilege Escalation"
    description: "Update aws-auth configmap on EKS clusters to gain cluster admin privileges"
---