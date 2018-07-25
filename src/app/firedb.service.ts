import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FiredbService {
  todosItemsRef: AngularFireList<any>;
  todosItems: Observable<any[]>;

  constructor(private todoDB: AngularFireDatabase) {

      this.todosItemsRef = todoDB.list('todos');
      this.todosItems = this.todosItemsRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    
  }

  viewtodolist(){
    return this.todosItems;
  }

  addtodoitem(itemDate:any, itemDes:any, itemSt: any){
    //this.todosItemsRef = this.todoDB.list('todos');
    this.todosItemsRef.push({"flag":itemSt,"date":itemDate,"item":itemDes});
  }

  deltodoitem(itemid: any){
    this.todosItemsRef.remove(itemid)
      .catch(error => this.handleError(error));
  }


  delalltodoitems(){
    this.todosItemsRef.remove()
    .catch(error => this.handleError(error));
  }

  //----- to handle errors
  private handleError(error) {
    console.log(error);
  }

}
