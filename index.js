#!/usr/bin/env node

const parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2), {
    alias: { 's': ['secret'], 'h': ['help'] },
    string: ['s', 'secret', '_'],
    boolean: ['h', 'help']
});

if ( !argv._.length && !argv.secret || argv.help ) {
    usage();
    process.exit(0);
}

(function () {
    const crypto = require('crypto');
    const secret = argv.secret || '';
    const param_str = argv._[0] || '';

    //creating hmac object
    const hmac = crypto.createHmac('sha256', secret);

    //passing the data to be hashed
    const data = hmac.update(param_str);

    //Creating the hmac in the required format
    const gen_hmac = data.digest('base64');

    console.log(gen_hmac);
})();

function usage() {
    const cmd = `
This is a command line tool for calculate hmac with sha256 and base64 encrypt.

Default Secret Key is '' (empty String), please use this tool with your key each time.

Usage:
------------
-h  --help   : help for usage.
-s  --secret : secret key for hamc.

Example.
------------
hmac-tool '{"a": 1, "b": 1}' -s 'secret'
        `;
    console.log(cmd);
}

