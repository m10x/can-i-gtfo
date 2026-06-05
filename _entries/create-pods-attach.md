---
verb: "create"
resource: "pods/attach"
description: "Attach to running pods and view logs in real-time"
abuses:
  - type: "Lateral Movement"
    description: "Use attach to attach to a process running on a pod"
    code: |
      # Attach to process of target-pod, use -i -t for raw terminal mode
      kubectl attach target-pod

      # if you can alse create pods, create a pod with 'command: ["/bin/sh"]' to attach to the shell
---
