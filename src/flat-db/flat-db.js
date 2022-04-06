// using .promises brings in the nodeJS native promise-fied API for 'fs' (filesystem module)
const fs = require('fs');

module.exports = {

    readFile: function (path, callback_fn) {
        console.log('Reading from DB file...');
        // try/catch block doesn't work for async functions like this one. using this to supress exceptions thrown from JSON.parse
        // need to use promises or async/await to make the try/catch work
        try {
        fs.readFile(path, 'utf-8', callback_fn);
        }
        catch (e) {
            // do nothing
            return;
        }
        
    },

    writeFile: (path, data) => {
        console.log('Writing to DB file...');
        // handle brackets and comma limiter for parsing.
        fs.readFile(path, 'utf-8', (err, fileContents) => {
            // file doesn't exist?
            if (err) {
                console.log('DB File not found! Creating DB file...');
                data = '[' + data + ']';
                fs.writeFile(path, data, (err) => { if (err) console.log("Error when creating database file: " + err)});
            }
            // file exists
            else {
                console.log('DB File found. Writing new session data...');
                // remove end delimiter
                let appendedData = fileContents.slice(0, -1) + ',' + data + ']';
                fs.writeFile(path, appendedData, (err) => { if (err) console.log("Error when writing out to database file: " + err)});
            }
        });
    console.log('Wrote out to DB File.');
}
    
}
