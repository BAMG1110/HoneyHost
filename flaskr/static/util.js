// eventos
const eventoClickDerecho = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    view: window,
    button: 2 // Código para el botón derecho del mouse
});
// variables estaticas
const root = document.documentElement;

// variables de estado
let currentThemeIndex = 2;

// temas de la app
const obsidianTheme = {
    'main-bg': '#38008b',
    'component-bg': '#1f0050',
    'text-font': '#f7fab9',
    'button-font': '#f7fab9', // Texto claro para contraste
    'header-font': '#FFFFFF', // Encabezados claros para máximo contraste
    'button': '#32164e',
    'bgAcepted': 'rgba(129, 199, 132, 0.8)',
    'bgPending': 'rgba(255, 213, 79, 0.8)',
    'bgRejected': 'rgba(239, 83, 80, 0.8)',
    'debug': 'LightSkyBlue',
    'info': 'DeepSkyBlue',
    'warn': 'SteelBlue',
    'error': 'DarkSlateGray',
    'selected': '#3A96DD'
};
const lightTheme = {
    'main-bg': '#F0F4F8',
    'component-bg': '#E5E5E5',
    'text-font': '#333333', // Actualizado para representar texto general
    'button-font': '#FFFFFF', // Blanco para contraste en botones
    'header-font': '#000000', // Negro para encabezados, asegura contraste y atención
    'button': '#4A90E2',
    'bgAcepted': 'rgba(100, 221, 23, 0.8)',
    'bgPending': 'rgba(253, 216, 53, 0.8)',
    'bgRejected': 'rgba(229, 57, 53, 0.8)',
    'debug': 'LightSkyBlue',
    'info': 'DeepSkyBlue',
    'warn': 'SteelBlue',
    'error': 'DarkSlateGray',
    'selected': '#66B2FF'
};

const darkTheme = {
    'main-bg': '#080808',
    'component-bg': '#111111',
    'text-font': '#CCCCCC', // Gris claro para texto, asegura legibilidad
    'button-font': '#CCCCCC', // Manteniendo coherencia, el texto de botones también es gris claro
    'header-font': '#FFFFFF', // Blanco para encabezados, destaca sobre fondos oscuros
    'button': '#333333',
    'bgAcepted': 'rgba(76, 175, 80, 0.8)',
    'bgPending': 'rgba(255, 235, 59, 0.8)',
    'bgRejected': 'rgba(244, 67, 54, 0.8)',
    'debug': 'LightSkyBlue',
    'info': 'DeepSkyBlue',
    'warn': 'DodgerBlue',
    'error': 'FireBrick',
    'selected': '#4A90E2'
};

// Array con los temas disponibles
const themes = [obsidianTheme, darkTheme, lightTheme];

// Función para cambiar el tema
const switch_theme = document.getElementsByClassName('switch_theme')
function switchTheme() {
    for (const property in themes[currentThemeIndex]) {
        root.style.setProperty(`--${property}`, themes[currentThemeIndex][property]);
    }
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
}
// logo nav
switch_theme[0].addEventListener('click', switchTheme)

// logo footer
switch_theme[1].addEventListener('click', switchTheme)

switchTheme()