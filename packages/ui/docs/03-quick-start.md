
```tsx
import { Card } from '@logifex/ui'

<Card
  title="User Settings"
  mode="simple"
>
  Basic content
</Card>
```
Add actions with intent:

```tsx
<Card
  title="User Settings"
  mode="pro"
  actions={[
    {
      id: 'delete',
      label: 'Delete',
      capability: 'delete',
      intent: { type: 'user:delete' }
    }
  ]}
>
  Content
</Card>
```
No side effects happen here.
The UI only describes intent.