import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../models/dialogData.model';

@Component({
  selector: 'app-dialogue-data',
  templateUrl: './dialogue-data.component.html',
  styleUrls: ['./dialogue-data.component.css']
})
export class DialogueDataComponent{

  constructor(public dialogRef: MatDialogRef<DialogueDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


}
