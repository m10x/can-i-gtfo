---
verb: "bind"
resource: "roles"
description: "Bind roles to users, groups, or service accounts"
abuses:
  - type: "Privilege Escalation"
    description: "Bind privileged roles to controlled accounts to escalate privileges"
    code: |
      # Bind admin role to controlled user
      kubectl create rolebinding admin-escalation --role=admin --user=attacker
---