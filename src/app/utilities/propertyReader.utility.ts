'use strict';

import * as fs from 'fs';
import * as express from 'express';

export default class PropertyReaderUtility {
    private sourceFile = "src/application.properties";
    private properties = {};
    private _section = '';
    public app: any;
    constructor(app: any) {
        this.app = app;
        this.append(this.sourceFile);
    }

    append(sourceFile: string): void {

        if (sourceFile) {
            this.read(fs.readFileSync(sourceFile, 'utf-8'));
        }
    }

    read(input: any) {
        delete this._section;
        ('' + input).split('\n').forEach(this.readLine, this);
        return this;
    }

    readLine(propertyString: string) {
        if (!!(propertyString = propertyString.trim())) {
            let section = /^\[([^=]+)\]$/.exec(propertyString);
            let property = !section && /^([^#=]+)(={0,1})(.*)$/.exec(propertyString);
            if (section) {
                this._section = section[1];
            }
            else if (property) {
                let section = this._section ? this._section : '';
                this.bindToExpress(section, property[1].trim(), property[3].trim());
            }
        }

    }

    bindToExpress(section: string, key: string, value: string) {
        if (section == process.env.NODE_ENV) {
            value = value.replace("{application.name}", this.app.get("application.name"));
            this.app.set(key, value);

        }
    }


}