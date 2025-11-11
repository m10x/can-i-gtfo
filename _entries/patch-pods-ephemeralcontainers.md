---
verb: "patch"
resource: "pods/ephemeralcontainers"
description: "Patch ephemeral containers in running pods for debugging and code execution"
abuses:
  - type: "Container Escape"
    description: "Patch ephemeral containers with host access capabilities to escape container boundaries"
    code: |
      # Patch pod with ephemeral container that has host network access
      # Patch pod with ephemeral container that mounts host filesystem
  - type: "Lateral Movement"
    description: "Patch ephemeral containers on other nodes with host access capabilities to escape container boundaries"
    code: |
      # Patch pod with ephemeral container that has host network access
      # Patch pod with ephemeral container that mounts host filesystem
---