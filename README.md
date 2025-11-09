# can-i gtfo?

[can-i gtfo](http://m10x.de/can-i-gtfo/) is a collection of Kubernetes RBAC permissions which can be abused to escape from pods, escalate privileges and more.

![isforme](assets/images/canigtfo.png)

## Contributing

Collaboration and contributions with additional techniques are very welcome! If you know of other Kubernetes RBAC permissions that can be exploited or have discovered new attack vectors, please share them with the community.

### Adding New Entries

To add a new exploitation technique, simply create a new file under the `_entries/` directory. Each entry follows this structure:

```yaml
---
verb: "your-verb"
resource: "your-resource"
description: "Brief description of what this permission allows"
exploits:
  - type: "Exploit Category"
    description: "Description of the exploitation technique"
    code: |
      # Your kubectl commands or exploitation code here
      kubectl example command
      
  - type: "Another Category"
    description: "Another exploitation method"
    code: |
      # More commands
      kubectl another example
---
```
