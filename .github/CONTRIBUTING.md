# Guía de Contribución

## 🌟 ¿Cómo Contribuir?

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Convenciones de Código

- Usar TypeScript estricto
- Seguir el estilo de código definido en .prettierrc
- Mantener los componentes pequeños y enfocados
- Escribir nombres descriptivos para variables y funciones
- Documentar funciones complejas
- Usar tipos explícitos en lugar de 'any'

## 🔍 Proceso de Review

1. Asegurarse que el código pasa todos los tests
2. Verificar que el código sigue las convenciones de estilo
3. Incluir screenshots para cambios visuales
4. Actualizar la documentación si es necesario

## 🐛 Reportar Bugs

1. Usar la plantilla de issues
2. Incluir pasos para reproducir el error
3. Describir el comportamiento esperado vs actual
4. Incluir screenshots si es posible

## 💡 Proponer Cambios

1. Abrir un issue primero para discutir cambios mayores
2. Explicar el problema y la solución propuesta
3. Esperar feedback antes de empezar a trabajar

## 🚀 Setup del Proyecto

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests
npm test

# Build para producción
npm run build
```

## 📋 Checklist para Pull Requests

- [ ] ¿El código sigue las convenciones de estilo?
- [ ] ¿Se han añadido/actualizado los tests necesarios?
- [ ] ¿La documentación está actualizada?
- [ ] ¿El código está libre de errores de TypeScript?
- [ ] ¿Se ha probado en diferentes navegadores?