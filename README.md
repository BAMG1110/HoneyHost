# Network admin

Este repositorio contiene scripts y herramientas para administración de redes.

## Ejecutar aplicación

1. Crear el entorno virtual con Python
```bash
python -m venv venv
```

2. Activar el entorno virtual
```bash
.\venv\Scripts\activate
```

3. instalar dependencias
```bash
pip install -r .\requirements.txt
```

4. inicializar base de datos
```bash
flask --app flaskr init-db
```

5. Ejecutar la aplicación Flask en modo debug:
```bash
flask --app flaskr run --debug
```
