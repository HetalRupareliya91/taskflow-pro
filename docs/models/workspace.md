# Workspace model

| Field       | Type   | Required | Notes                         |
|-------------|--------|----------|-------------------------------|
| id          | uuid   | auto     | generated on create           |
| title       | string | yes      | max 120 characters            |
| description | string | no       | max 2000 characters           |
| status      | string | no       | `active` (default), `archived` |
| createdAt   | ISO    | auto     |                               |
| updatedAt   | ISO    | auto     | refreshed on every update     |
