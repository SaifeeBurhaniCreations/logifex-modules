Adapters translate **application logic** into **UI props**.

UI components:
- never import hooks
- never know about backend
- never perform effects

Adapters:
- may use hooks
- may read state
- must return plain data