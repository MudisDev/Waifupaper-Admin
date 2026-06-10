# 🌐 WaifuPaper Admin

> Panel web de administración desarrollado en React para gestionar contenido de WaifuPaper (app móvil) desde escritorio.

![React](https://img.shields.io/badge/React-Web_App-61DAFB)
![CSS](https://img.shields.io/badge/CSS-Custom_UI-blue)
![PHP](https://img.shields.io/badge/PHP-Backend-purple)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![REST API](https://img.shields.io/badge/API-REST-orange)
![Shared API](https://img.shields.io/badge/Shared_API-WaifuPaper-pink)
![Access](https://img.shields.io/badge/Access-Private_Admin-red)
![Admin Panel](https://img.shields.io/badge/Type-Admin_Panel-darkgreen)
![Estado](https://img.shields.io/badge/Estado-Private_Beta-blue)

---

## 💻 Descripción

**WaifuPaper Admin** es una **webapp** privada desarrollada en React, creada para administrar el contenido de la aplicación móvil WaifuPaper sin depender del panel interno de la app.

El sistema está diseñado para acceso restringido a administradores/desarrolladores autorizados, permitiendo gestionar personajes, wallpapers y contenido relacionado directamente desde navegador, facilitando el flujo de trabajo desde escritorio y mejorando la escalabilidad del ecosistema de WaifuPaper.

Fue desarrollado como una herramienta administrativa interna para centralizar la gestión de contenido de WaifuPaper, reutilizando una API REST compartida entre el panel web y la aplicación móvil.

El proyecto también sirvió como experimento de arquitectura cliente-servidor, separación de responsabilidades y administración remota de contenido desde un entorno web.

---

<!-- ## 📸 Capturas

<table>
<tr>
<td align="center">
<b>Galería principal</b><br>
<img src="./screenshots/2_galeria_principal.png" width="220">
</td>

<td align="center">
<b>Perfil de Personaje</b><br>
<img src="./screenshots/5_perfil_personaje.png" width="220">
</td>

<td align="center">
<b>Búsqueda por Etiquetas</b><br>
<img src="./screenshots/3_busqueda_etiquetas.png" width="220">
</td>
</tr>

<tr>
<td align="center">
<b>Login</b><br>
<img src="./screenshots/1_login.png" width="220">
</td>

<td align="center">
<b>Wallpaper</b><br>
<img src="./screenshots/7_wallpaper.png" width="220">
</td>

<td align="center">
<b>Agregar Personaje</b><br>
<img src="./screenshots/9_agregar_personaje.png" width="220">
</td>
</tr>
</table>

> Puedes ver más capturas dentro de la carpeta `/screenshots`.

--- -->

## ✨ Características principales

### Técnicas

- 📡 Consumo de API REST compartida con WaifuPaper
- 🧩 Arquitectura modular basada en componentes reutilizables
- 🔐 Validación de datos en frontend y backend
- 📤 Subida de imágenes directamente al servidor
- 🌐 Backend y base de datos desplegados en dominio propio
- 🧪 Validación manual de endpoints utilizando Postman
- ⚙️ Separación clara entre interfaz, lógica y backend

### Funcionales

- 🧑‍💻 Panel web privado para gestión de contenido
- 🔒 Acceso restringido a administradores/desarrolladores
- ➕ Alta, edición y eliminación de personajes
- 🖼️ Gestión completa de wallpapers
- 🔎 Administración centralizada de contenido
- 📱 Sustitución del panel administrativo móvil
- ⚡ Flujo de trabajo optimizado desde escritorio

---

## 🛠️ Tecnologías utilizadas

### Frontend web

- React
- JavaScript

### Backend compartido

- PHP
- MySQL

### Infraestructura

- Hostinger
- Hosting y Base de Datos en dominio propio

### Herramientas

- VS Code
- Postman

---

## 📊 Estadísticas del proyecto

| Métrica              | Valor                            |
| -------------------- | -------------------------------- |
| Endpoints utilizados | +15                              |
| Tipo de proyecto     | Panel administrativo web         |
| Arquitectura         | Cliente-Servidor / API REST      |
| Estado               | Planeado para subdominio privado |

---

## 🧠 Arquitectura del proyecto

WaifuPaper Admin funciona como una capa de administración web conectada al backend principal de WaifuPaper.

```text
    Admin / Developer
            ↓
    React Admin Panel
            ↓
        API REST (PHP)
            ↓
        MySQL Database
            ↑
        API REST (PHP)
            ↑
    WaifuPaper Mobile App
```

El panel reutiliza la misma API REST utilizada por la aplicación móvil, permitiendo centralizar la lógica de negocio y mantener sincronizado el contenido entre plataformas.

Esto permite:

- 🧩 Administración centralizada del contenido
- ⚡ Gestión rápida desde escritorio
- 🔐 Validaciones compartidas entre sistemas
- ♻️ Reutilización del backend existente
- 📦 Escalabilidad del ecosistema WaifuPaper

---

## ⚙️ Configuración del proyecto

Por motivos de seguridad, las credenciales del backend y conexión a base de datos **no se encuentran incluidas dentro del repositorio**.

El proyecto utiliza:

- 🌐 API REST propia compartida con WaifuPaper
- 🗄️ Base de datos MySQL remota
- 🔐 Variables privadas de conexión
- 📤 Endpoints personalizados para administración de contenido

La estructura del proyecto y el código fuente muestran el funcionamiento general del panel administrativo.

Las capturas serán agregadas una vez completada la integración con entorno de producción utilizando contenido original del proyecto, evitando el uso de placeholders temporales durante el desarrollo.

---

## 🌐 Demo / Despliegue

El panel está diseñado para operar mediante un subdominio privado conectado al backend principal de WaifuPaper, permitiendo administración remota del contenido desde navegador.

Por motivos de seguridad, el acceso está restringido a administradores/desarrolladores autorizados y actualmente no se encuentra disponible públicamente.

---

<!-- ## 🎥 Devlogs

El desarrollo ha sido documentado públicamente como parte de mi proceso de aprendizaje y construcción de producto.

- 🎬 **Devlog #1** _[Enlace directo a YouTube](linkBv)_

--- -->

## 🔮 Futuras mejoras

- 📊 Dashboard con métricas y estadísticas
- 👥 Sistema de roles (admin / editor)
- 🧾 Historial de cambios
- 📁 Organización avanzada de wallpapers
- 🔔 Sistema interno de notificaciones

---

## 👨‍💻 Autor

**Martín Bibiano (MudisDev)**

📧 Email: [devgames.studio4@gmail.com](mailto:devgames.studio4@gmail.com)
💼 Portfolio: _[mudisdev.com](https://mudisdev.com)_
🐙 GitHub: _[github.com/MudisDev](https://github.com/MudisDev)_

---

## ⚠️ Estado del Proyecto

Este proyecto se encuentra en uso activo como herramienta administrativa de WaifuPaper y continuará recibiendo mejoras enfocadas en escalabilidad, experiencia de usuario y optimización del flujo de gestión de contenido.
