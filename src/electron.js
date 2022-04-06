const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const flatDB = require('./flat-db/flat-db');

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 1000;
// app starts in the ASAR archive (a format used by electron that is basically a read-only folder that doesn't require extracting to read). 
//the fs module doesn't work in it because it is a read-only archive -- cannot be written to. 
// so we navigate out of it to create a database file right outside of it.
const DATABASE_PATH = __dirname + '/../../session-database';

console.log("Electron loaded...");

// const loadDatabase = () => {
    // TODO: Basically, sqlite3 is a 'native' nodeJS module which I guess that means it uses native architecture specific APIs and must be rebuild for
    // each node version and each different architecture -- not really ideal for me. I want to write a simple module that will handle simple
    // data persistence in the form of JSON and be able to do sql-like functions like aggregate and parse the file. this will be good practice
    // and will give me a lot of flexibility rather than messing with rebuilding stuff or messing with other databases. that's pretty overkill. 
// }


let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        webPreferences: {
            // provides NodeJS envrionment to renderer so it can use the NodeJS API.
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    win.on('closed', () => win = null);
}


app.on('ready', createWindow);

ipcMain.on('write-session-data', (event, data) => {
    // write session data to flat DB using JSON.stringify which will convert the JS object into JSON
    flatDB.writeFile(DATABASE_PATH, JSON.stringify(data));

    // console.log('data recieved:', data);
    // event.reply('reply', 'hi')

});

ipcMain.on('read-session-data', (event, data) => {
    console.log('Reading session data and sending back...');

    flatDB.readFile(DATABASE_PATH, (err, data) => {
        // try/catch block doesn't work for async functions like this one. using this to supress exceptions thrown from JSON.parse
        // need to use promises or async/await to make the try/catch work
        try {
            event.reply('recieved-session-data', JSON.parse(data));
        }
        catch (e) {
            // do nothing
            return;
        }
    });
});
