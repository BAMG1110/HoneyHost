# Network Admin 🌐

Una colección de scripts y herramientas para la administración profesional de redes empresariales.

## 📋 Tabla de Contenidos
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Documentación](#documentación)
- [Licencia](#licencia)

## ⭐ Características
- Gestión centralizada de dispositivos de red
- Administración de sucursales
- Interfaz web intuitiva
- Compatibilidad con múltiples tipos de dispositivos
- Base de datos integrada

## 🔧 Requisitos Previos
- Python 3.x
- pip (gestor de paquetes de Python)
- Acceso a los dispositivos de red

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/network-admin.git
cd network-admin
```

### 2. Crear y activar el entorno virtual
```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
.\venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

## ⚙️ Configuración

### Inicializar la base de datos
```bash
flask --app flaskr init-db
```

### Ejecutar la aplicación
```bash
flask --app flaskr run --debug
```

## 📱 Uso

### Agregar una Nueva Sucursal
1. Navegar a la interfaz web
2. Hacer hover sobre el icono de perfil (esquina superior izquierda)
3. Seguir la ruta: Perfil > Branches
4. Completar el formulario y guardar

### Agregar un Nuevo Dispositivo
1. Navegar a la interfaz web
2. Hacer hover sobre el icono de perfil
3. Seguir la ruta: Devices > Perfil > Devices
4. Completar el formulario y guardar

## 📖 Documentación

### Tipos de Dispositivos Soportados
Esta aplicación utiliza Netmiko para la conexión con dispositivos. Para ver la lista completa de dispositivos soportados, consulte la [documentación oficial de Netmiko](https://github.com/ktbyers/netmiko).

## 📄 Licencia

MIT License

Copyright (c) 2024 [Tu Nombre]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
