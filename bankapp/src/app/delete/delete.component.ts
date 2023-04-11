import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {
    
  }
  //to hold value from parent
  @Input() item:string | undefined
  @Output() Oncancel = new EventEmitter()//to geneerate event for cancel
  @Output() OnDelete = new EventEmitter()//to geneerate event for cancel
  cancel(){
    this.Oncancel.emit()
  }
  delete(){
    this.OnDelete.emit(this.item)
  }
}
