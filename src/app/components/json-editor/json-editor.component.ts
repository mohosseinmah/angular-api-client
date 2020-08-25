import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import * as ace from 'ace-builds';
import {Ace} from 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-eclipse';


const ECLIPSE_THEME = "ace/theme/eclipse";
const JSON_MODE = "ace/mode/json";
const STARTING_POSITION = {row: 0, column: 0};

@Component({
    selector: 'json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements AfterViewInit {
    aceEditor: Ace.Editor;

    @ViewChild("ace") elementRef: ElementRef<HTMLDivElement>;
    @Input("read-only") readOnly: boolean;

    private _value: string;
    @Output() valueChange: EventEmitter<string>;

    constructor() {
        this.valueChange = new EventEmitter<string>();
    }

    ngAfterViewInit(): void {
        this.aceEditor = ace.edit(this.elementRef.nativeElement);
        this.aceEditor.getSession().setMode(JSON_MODE);
        this.aceEditor.setTheme(ECLIPSE_THEME);
        this.aceEditor.setReadOnly(this.readOnly);
        this.setEditorValue();
    }

    @Input() set value(val: string) {
        this._value = val;
        if (this.aceEditor) {
            this.setEditorValue();
        }
    }

    private setEditorValue() {
        this.aceEditor.setValue(this._value);
        this.aceEditor.moveCursorToPosition(STARTING_POSITION);
    }

    updateValue(): void {
        this._value = this.aceEditor.getValue();
        this.valueChange.emit(this._value);
    }
}
