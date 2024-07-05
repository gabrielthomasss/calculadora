const { app, BrowserWindow, Menu, nativeTheme} = require('electron');
const path = require('path');

function createMainWindow() {
    nativeTheme.themeSource = 'dark'
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        icon: 'assets/icone.ico',
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    });

    mainWindow.loadFile('app/index.html');
    
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Atualizar',
                    role: 'reload'
                },

                {
                    label: 'Sobre',
                    click() {
                        createAboutWindow();
                    }
                },

                {
                    label: 'Sair',
                    click() {
                        app.quit();
                        
                    }
                },

            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
}

function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Sobre',
        icon: 'assets/icone.ico',
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
           
        }
    });

    aboutWindow.loadFile('app/sobre.html');
    
    const menu = Menu.buildFromTemplate([
        {
            label: 'Sair',
            click() {
                app.quit();
            }
        }
    ]);
    aboutWindow.setMenu(menu);
}
    

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});