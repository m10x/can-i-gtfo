---
verb: "update"
resource: "pods/ephemeralcontainers"
description: "Update ephemeral containers in running pods for debugging and code execution"
abuses:
  - type: "Container Escape"
    description: "Update ephemeral containers with host access capabilities to escape container boundaries"
    code: |
      # Update pod with ephemeral container that has host network access
      # Update pod with ephemeral container that mounts host filesystem
  - type: "Lateral Movement"
    description: "Update ephemeral containers on other nodes with host access capabilities to escape container boundaries"
    code: |
      # Update pod with ephemeral container that has host network access
      # Update pod with ephemeral container that mounts host filesystem    
---