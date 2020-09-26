import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import * as ace from 'ace-builds';
import {Ace} from 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-eclipse';


const ECLIPSE_THEME = "ace/theme/eclipse";
const JSON_MODE = "ace/mode/json";
const STARTING_POSITION = {row: 0, column: 0};

function format(text: string): string {
    try {
        return JSON.stringify(JSON.parse(text), null, 4);
    } catch (e) {
        return text;
    }
}

@Component({
    selector: 'json-editor',
    templateUrl: './json-editor.component.html'
})
export class JsonEditorComponent implements AfterViewInit {
    aceEditor: Ace.Editor;

    @ViewChild("ace") elementRef: ElementRef<HTMLDivElement>;
    @Input("read-only") readOnly: boolean;
    @Output() valueChange: EventEmitter<string>;

    constructor() {
        this.valueChange = new EventEmitter<string>();
    }

    private _value: string;

    @Input() set value(val: string) {
        this._value = val;
        if (this.aceEditor) {
            this.setEditorValue();
        }
    }

    ngAfterViewInit(): void {
        this.aceEditor = ace.edit(this.elementRef.nativeElement);
        this.aceEditor.getSession().setMode(JSON_MODE);
        this.aceEditor.setTheme(ECLIPSE_THEME);
        this.aceEditor.setReadOnly(this.readOnly);
        this.setEditorValue();
    }

    updateValue(): void {
        this._value = this.aceEditor.getValue();
        this.valueChange.emit(this._value);
    }

    private setEditorValue(): void {
        this.aceEditor.setValue(format(this._value));
        this.aceEditor.moveCursorToPosition(STARTING_POSITION);
    }
}
