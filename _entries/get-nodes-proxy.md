---
verb: "get"
resource: "nodes/proxy"
description: "Allows to make GET requests to the kubelet API as system:masters"
exploits:
  - type: "Information Disclosure"
    description: "Access kubelet API directly through node proxy to collect sensitive node and container information"
    code:
    references:
      - "https://github.com/kubernetes/kubernetes/issues/119640"
---
