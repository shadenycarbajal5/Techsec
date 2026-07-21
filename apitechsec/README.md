# apitechsec — Backend TechSec (E-commerce + Servicios Técnicos)

Backend Spring Boot para el sistema de e-commerce y gestión de servicios técnicos
(TechSec), siguiendo la misma arquitectura por capas del proyecto de referencia del
curso (`entity → repository → business → controller → dto`), con dos diferencias
deliberadas respecto a ese proyecto:

1. **IDs numéricos autoincrementales** (`bigint`) en vez de `char(36)` UUID, porque el
   frontend Angular ya está construido asumiendo `id: number` en todos los modelos.
2. **Autenticación con JWT propio** (login/refresh contra este mismo backend), en vez de
   Keycloak — tal como se acordó al adaptar el prompt de arquitectura de clase.

## 1. Base de datos

```bash
mysql -u root -p < dbscript/db.sql
```

Esto crea `dbtechsec` con las 13 tablas y datos semilla: 3 categorías, 8 productos,
3 técnicos y 2 usuarios demo.

## 2. Configuración

Edita `src/main/resources/application.properties` si tu MySQL/MariaDB usa otro
usuario/contraseña que `root` / `030191`.

## 3. Ejecutar

```bash
mvn spring-boot:run
```

La API queda en `http://localhost:8080`. Swagger UI en `http://localhost:8080/docs`.

> **Nota:** no pude compilar este proyecto en el entorno donde lo generé porque no
> tiene acceso a Maven Central (solo a un listado corto de dominios permitidos). El
> código fue revisado línea por línea, pero corre `mvn compile` en tu máquina antes de
> asumir que está 100% libre de errores.

## 4. Usuarios demo (password para ambos: `123456`)

| Usuario            | Rol      |
|--------------------|----------|
| admin@demo.com     | ADMIN    |
| cliente@demo.com   | CLIENTE  |

## 5. Contrato de respuesta (IMPORTANTE para el frontend)

Siguiendo el patrón exacto del profesor, **todas** las respuestas están envueltas en
un sobre `ResponseGeneric`:

```json
{
  "type": "success",
  "listMessage": ["Cotización registrada correctamente."],
  "listProduct": [ ... ]   // el nombre de la lista varía según el endpoint
}
```

- `GetAll` → `{ type, listMessage, listX: [...] }` (ej. `listProduct`, `listOrder`,
  `listAppointment`, `listQuote`, `listCategory`, `listTechnician`, `listUser`,
  `listContract`).
- `Insert` → `{ type, listMessage }` (sin devolver el objeto creado — hay que volver a
  pedir la lista con `GetAll` después de insertar).
- `UpdateStatus` (`/order/{id}/status`, `/appointment/{id}/status`,
  `/quote/{id}/status`) → `{ type, listMessage }`.
- `/auth/login` y `/auth/refresh` → sí devuelven datos extra (`access_token`,
  `refresh_token`, `expiresIn`, y en login además el objeto `user`).

**El frontend Angular que entregué antes todavía NO desenvuelve este sobre** — asume
arrays/objetos planos. Ese ajuste (12 archivos de `api/fn/operations` + varios
componentes que usaban el objeto devuelto por `Insert`) queda pendiente para la
siguiente sesión.

## 6. Endpoints

| Método | Endpoint                        | Descripción                              |
|--------|----------------------------------|-------------------------------------------|
| POST   | /auth/login                     | Login (JWT propio)                        |
| POST   | /auth/refresh                   | Renovar access token                      |
| POST   | /auth/register                  | Registro de cliente                       |
| GET    | /user                           | Listar usuarios                           |
| GET/POST | /category                     | Listar / crear categorías                 |
| GET/POST | /product                      | Listar / crear productos                  |
| GET/POST | /technician                   | Listar / crear técnicos                   |
| GET/POST | /quote                        | Listar / crear cotizaciones               |
| PATCH  | /quote/{id}/status              | Aceptar / rechazar cotización             |
| GET/POST | /order                        | Listar / crear pedidos                    |
| PATCH  | /order/{id}/status              | Cambiar estado del pedido                 |
| GET/POST | /appointment                  | Listar / crear citas                      |
| GET    | /appointment/availability?date= | Disponibilidad Mañana/Tarde de una fecha  |
| PATCH  | /appointment/{id}/status        | Cambiar estado / asignar técnico          |
| GET/POST | /contract                     | Listar / generar referencia de contrato   |

## 7. Pendiente (no implementado en este backend)

- Generación real del `.docx` del contrato (hoy solo se guarda la referencia en BD).
- Endpoint para subir evidencias fotográficas (`AppointmentFile`) — falta el
  `POST /appointment/{id}/files` con `multipart/form-data`.
- Endpoints de edición/eliminación de producto, categoría y técnico (el frontend ya
  tiene botones para esto pero hoy son "demo local" porque no existe el endpoint).
- Exportación de reportes Excel/PDF desde el backend (hoy el frontend genera el CSV en
  el navegador; los reportes "de verdad" con Apache POI/iText del lado servidor no
  están conectados a un endpoint todavía).
